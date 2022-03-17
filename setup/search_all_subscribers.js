q.Map(
  q.Paginate(Match(q.Index("newsletter_subscribers"), true)),
  q.Lambda("peopleRef", q.Get(q.Var("peopleRef")))
)

