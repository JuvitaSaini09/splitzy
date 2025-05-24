import { query } from "./_generated/server";
import { internal } from "./_generated/api";

export const getAllContacts = query({
  handler: async (ctx) => {
    const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

    // Goal of first 3 functions below this comment: To get list of the users with whom you have split, 1) I will get expenses paid by me (I paid, the other person still have to pay) and
    // 2) Then notPaidByMe(other person paid, my share pending). I will keep them together in array and
    // 3) I will extract the list of the other users in the split. (not me in the list)

    //1) get expenses paid by me
    const expensesYouPaid = await ctx.db
      .query("expenses")
      .withIndex("by_user_and_group", (q) =>
        q.eq("paidByUserId", currentUser._id).eq("groupId", undefined),
      )
      .collect();

    //2) get expenses not paid by me
    const expensesNotPaidByYou = (
      await ctx.db
        .query("expenses")
        .withIndex("by_group", (q) => q.eq("groupId", undefined))
        .collect()
    ).filter(
      (e) =>
        e.paidByUserId !== currentUser._id &&
        e.splits.some((s) => s.userId === currentUser._id),
    );

    // merge both arrays
    const personalExpenses = [...expensesYouPaid, ...expensesNotPaidByYou];
    // expenses paid by you in one to one expenses and expenses paid not paid by you in one to one expenses

    //3) get the list of the other users in the split
    const contactIds = new Set();
    personalExpenses.forEach((exp) => {
      // if you did not pay, add the id of the other person ( you have not paid means "paidByUserId" is the other person)
      if (exp.paidByUserId !== currentUser._id)
        contactIds.add(exp.paidByUserId);

      // Yf you paid, means "paidByUserId" is you so lets go through array to find the other user contact
      exp.splits.forEach((s) => {
        if (s.userId !== currentUser._id) contactIds.add(s.userId); // basically the person other than you who has a split
      });
    });

    /* ──────── other users detail data fetching from DB using Promise.all ──────── */
    const contactUsers = await Promise.all(
      [...contactIds].map(async (id) => {
        const u = await ctx.db.get(id);
        return u
          ? {
              id: u._id,
              name: u.name,
              email: u.email,
              imageUrl: u.imageUrl,
              type: "user",
            }
          : null;
      }),
    );

    /* ───────── groups where current user is a member ───────── */
    const userGroups = (await ctx.db.query("groups").collect())
      .filter((g) => g.members.some((m) => m.userId === currentUser._id))
      .map((g) => ({
        id: g._id,
        name: g.name,
        description: g.description,
        memberCount: g.members.length,
        type: "group",
      }));

          /* sort alphabetically */
    contactUsers.sort((a, b) => a?.name.localeCompare(b?.name));
    userGroups.sort((a, b) => a.name.localeCompare(b.name));

    return {
      users: contactUsers.filter(Boolean),
      groups: userGroups,
    }

  },
});
