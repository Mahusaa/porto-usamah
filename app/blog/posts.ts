export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "counting-mentions-is-not-reading-an-issue",
    title: "Counting mentions is not reading an issue",
    date: "2026-08-14",
    summary:
      "Volume charts tell you that something happened. They do not tell you what people are actually arguing about, or what follows from it.",
    body: `Most social monitoring starts and ends with a line going up. An issue breaks, mentions spike, someone screenshots the chart, and that becomes the story: *this got big*. It is the easiest number to produce and the least useful one to act on.

I have spent the past few months building a platform that tries to answer a harder question. Not *how loud* is this, but *what is being said, by whom, in response to what, and what does it imply*. Here is roughly how I think about the problem now.

## A spike is an effect, not an explanation

Two issues can produce identical volume curves and mean completely different things. One is a thousand people saying the same sentence because a single post went wide. The other is a thousand people arguing from six incompatible positions. If your pipeline stops at counting, both look like the same event.

So the first thing worth extracting is not a number but a shape: how many distinct claims are circulating, how they relate, and which ones are actually driving the rest.

## Reconstruct before you analyse

An issue has a chronology, and the chronology is usually the analysis. Which account said it first. What was ignored, and for how long. Which reply turned an obscure complaint into a general one. Whether the subject responded, when, and whether the response landed or added fuel.

Reconstructing that timeline is unglamorous work. It is mostly deduplication, near-duplicate detection, and getting timestamps right across sources that do not agree on time. But once the sequence is honest, most of the interesting conclusions fall out of it directly, and you stop needing clever models to tell you what happened.

## Cluster narratives, not keywords

Keyword buckets fail on exactly the cases you care about. People argue in paraphrase. They use sarcasm, local slang, abbreviations, and in Indonesian they code-switch mid-sentence. A keyword filter catches the obvious posts and misses the argument.

What works better is clustering by claim: group posts that are making the same point, whatever words they used to make it. Then a cluster becomes something you can describe in a sentence ("people think the response was late", "people think the rule is being applied selectively"), and you can watch that specific claim grow or die instead of watching an undifferentiated total.

## Sentiment is about stance, not mood

Off-the-shelf sentiment gives you positive, negative, neutral, and almost none of it survives contact with a real issue. A furious post supporting the subject and a calm post condemning it both get read wrong.

The question that matters is stance toward a claim: does this post accept it, reject it, or complicate it? That is a different labelling problem, it needs its own definitions, and it is worth the extra work, because "70% negative" is a mood ring, while "most of the criticism is about process, not the decision itself" is something a person can act on.

## Document the responses too

An issue is not only what the crowd says. It is also what the subject, the institutions, and the adjacent actors do about it: statements, silences, corrections, deletions. Those responses change the trajectory more than any individual post does, and they belong in the record next to the conversation, not in a separate slide.

## Say what it implies

The last step is the one most tools refuse to take. After the timeline, the clusters, and the stances, someone still has to write down what this means: which claims are likely to persist, which are already fading, what would escalate this, what would settle it.

That is a judgement, and judgements can be wrong. But a report that stops at "sentiment is 62% negative" has not saved anyone any work; it has just moved the reading problem downstream to whoever opens the dashboard.

## What I would tell myself in March

Build the boring parts first. Ingestion that does not lose posts, deduplication you trust, and timestamps you can defend. Every interesting layer sits on top of those, and no amount of model quality rescues a pipeline that quietly drops half the conversation.`,
  },
  {
    slug: "a-summer-of-zigbee",
    title: "A summer of Zigbee, and what MQTT taught me about latency",
    date: "2026-07-10",
    summary:
      "Two months of making air quality sensors, smart plugs and an air conditioner agree with each other. Most of the work was in the protocol, not the devices.",
    body: `Last year I spent a couple of months as an IoT engineer, wiring a building's worth of devices into something that behaved like one system: air quality monitoring, occupancy detection, automated AC control, lighting, smart plugs, and a solar PV inverter, all talking through HomeAssistant.

I expected the hard part to be the hardware. It was not. The hardware mostly works. The hard part is that every device has its own idea of when to speak, and your job is to make those ideas compatible.

## Zigbee is a mesh, and a mesh has opinions

Zigbee devices route through each other. That is the feature: you get range without running cable. It is also the failure mode: a router device that someone unplugs takes its neighbours' reliability with it, and the symptom shows up somewhere else entirely, hours later.

The practical lesson is that mains-powered devices are infrastructure. Where you place the plugs and lights determines how well the battery sensors report, so you plan those positions first and treat them as permanent.

## Topics are an API

MQTT is simple enough that you can start publishing to any string you like, and that is exactly the trap. Six weeks in, the topic tree *is* your integration contract, and renaming anything means touching every automation that subscribed to it.

What I settled on: topics describe location and capability rather than device model, because the model is the thing most likely to be replaced. Anything a human reads should be a payload field, not a topic segment.

## Retained messages are the difference between working and seeming to work

A restarted broker with no retained state gives you a dashboard full of "unknown" until every device happens to report again, which for a battery sensor on a slow interval can be a very long time.

Retain the state topics, do not retain the events. State is "the room is 26 degrees", and a new subscriber should learn it immediately. An event is "someone pressed the button", and replaying that to a new subscriber makes your lights come on for no reason.

## Where the latency actually lives

The interesting number in home automation is not throughput. It is the gap between a person walking into a room and the room reacting. Nobody notices 200ms. Everybody notices 2 seconds, because by then they have already reached for the switch themselves.

Almost none of that budget goes to the network. It goes to detection thresholds, debounce windows, and polling intervals that someone set conservatively to avoid false triggers. Tuning those per sensor and per room, rather than globally, did far more for perceived speed than anything I changed in the transport.

The other half is deciding what the system does while it is still unsure. Waiting for certainty before acting feels safe and reads as broken. Acting early on a cheap, reversible action (lights on now, AC only after the occupancy signal holds) feels instant and costs nothing when it is wrong.

## QoS is not a reliability strategy

QoS 1 gets your message delivered at least once, which means your subscriber will eventually see the same message twice and needs to be fine with that. Make handlers idempotent and stop worrying about it. "Set temperature to 24" is safe to repeat. "Increase temperature by one" is not, so do not design that message in the first place.

## What carried over

Every one of these habits followed me into backend work: name things after what they do rather than what they are, keep state and events apart, make handlers safe to repeat, and measure the delay a person actually feels rather than the one that is easy to graph.`,
  },
  {
    slug: "scoring-is-harder-than-serving",
    title: "Scoring an exam is harder than serving one",
    date: "2026-06-16",
    summary:
      "A tryout platform for 1,000+ students, and the realisation that delivering the questions was the easy half.",
    body: `I built an SNBT tryout platform as a freelance project: students sit a mock exam, get scored, and see where they stand. By the end it had served over a thousand students and five thousand submissions, with a hundred or so people writing at the same time during peak sessions.

Serving an exam is a solved problem. Render questions, save answers, do not lose them. Scoring one honestly is where it gets interesting.

## Raw scores lie to students

The obvious approach is one mark per correct answer. It is also unfair in a way students notice immediately: a set full of easy questions produces inflated scores, and a hard set makes competent people look weak. Since the whole point of a tryout is to predict how you will do on the real thing, a score that swings with the paper is worse than no score.

So the scoring runs on Item Response Theory instead. Each question carries its own difficulty, each answer updates an estimate of ability, and the resulting number means roughly the same thing across different papers. Students who took a harder set are not punished for it.

## Difficulty has to be earned, not declared

The catch with IRT is that it needs question parameters, and at the start nobody has them. Author-declared difficulty is a guess, and it is wrong often enough to matter, the question everyone gets right is frequently the one labelled hard.

The way out is to let responses correct the labels. Start with the declared difficulty, watch how a real cohort actually performs on each item, and update. Questions that everyone answers correctly, and questions that discriminate nothing because strong and weak students perform identically on them, are the ones worth pulling out of rotation first.

## Adaptive is a product decision before it is a technical one

Adjusting difficulty as a student answers gives you a better ability estimate from fewer questions. It also means two students see two different exams, which changes how the result feels, and if a student thinks the system handed them an unfairly brutal paper, the accuracy of the estimate is not the conversation you are having.

I kept the adaptation to a small number of difficulty bands and made the reporting explain itself. Being able to say "you were answering at this level, here is where that puts you" mattered more for trust than squeezing out a slightly tighter estimate.

## The performance work was mostly the database

Peak load is not evenly spread. It is a few hundred people submitting inside the same few minutes, because everyone starts the tryout at the announced time.

Almost all of the ~30% latency improvement came from the database rather than the application: indexing what the hot queries actually filter on, not fetching whole rows to compute an aggregate, and making sure a submission wrote once instead of triggering a cascade of reads. None of it was clever. It was reading the query plan, then fixing what it showed.

## LaTeX turned out to be a real requirement

Maths questions cannot be plain text. Over a hundred items needed proper formula rendering, and "close enough" is not acceptable when a misrendered exponent changes the answer. Rendering it server-side and caching the output kept it fast and, more importantly, kept it identical for every student.

## Uptime is a scheduling problem

Holding 99%+ uptime through the tryout windows was less about infrastructure heroics than about knowing exactly when the traffic arrives. The schedule was published in advance, so no deploys near a session, and any risky migration went out immediately after one ended.

Zero data loss came from the same conservatism: write the answer the moment it is given, treat the client as unreliable, and never make a student's progress depend on a clean disconnect.

## The part I would keep

If I built it again I would still spend the first week on the scoring model and the last week on the interface. The interface is what students compliment. The scoring model is why the number they see is worth anything.`,
  },
];

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function readingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
