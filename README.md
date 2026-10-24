# CourseFlow — 智能课表优化实验室
HackSHSID 2026 · Track 1 / School Life

A runnable, explainable, single-student timetable optimization prototype. Open **index.html** in a browser. No installation, server, API key, account, or internet is required. Keep index.html, style.css, engine.js and app.js together.

## Features
- Odd/even week schedules transcribed from the supplied example; no student or teacher names.
- Automatic best-improvement local search and before/after comparisons.
- Exact per-subject lesson count AND teaching-minute preservation.
- Fixed CAS, Football and empty slots; optional additional lesson locks.
- Teacher unavailability input; teacher/room blocked-slot validation in the engine.
- JSON export and browser print.

## Test
Optional: install Node.js from https://nodejs.org/ and run `node test.js` in this directory. No npm install is needed. Results are regenerated in evidence/results.json and evidence/test-log.txt. Browser use does not require Node.

## Model
35 positions per week. Period durations: [60,40,40,45,55,40,40] minutes. A lesson keeps its subject, teacher token and room. Only equal-duration positions may exchange lessons. Odd/even weeks are optimized separately, retaining their distinct subject requirements. CAS, Football and empty Friday slots are fixed as conservative prototype assumptions, NOT verified school policy.

Movement proxy M = sum of absolute floor differences between occupied consecutive periods in each day, excluding the lunch transition P4→P5. Room first digit is assumed to represent floor. Same-floor distance, corridors, stairs, crowding and travel time are NOT modelled. Football's listed room is retained from the source even though its actual teaching venue is unverified.

Repeated-course penalty R = sum over days and subjects of max(0, daily count−1). This is a preference, not a claim that double lessons are educationally undesirable. CAS is fixed and contributes a constant repetition penalty in odd weeks.

Objective: M + wR (default w=3). Iterate over every legal pair, choose the strictly improving swap with lowest penalized score; stop when no improving swap exists or 80 rounds are reached. Resource constraint violations have a 100000 penalty during repair; the separate validator determines final validity. A remaining violation means no usable result was found, not a proof that the problem is infeasible. No global-optimality claim.

## Actual recorded results (default weight 3)
| Week | Movement proxy before→after | Repetitions before→after | Objective before→after |
|---|---|---|---|
| Odd | 17→11 | 2→1 | 23→14 |
| Even | 16→10 | 2→0 | 22→10 |
22 automated tests passed. Timings depend on machine. See evidence for raw measurements. These results apply only to the supplied example, not the whole school.

## Sources and limits
Requirements: user-supplied “Track 1 Problem Statement.pdf” and “CS_Project_HackSHSID_2026 - G9(1).pdf”. The latter maps Track 1 to School Life. Data: manually transcribed user-supplied sample timetable; original image and PDFs are deliberately not bundled because the screenshot contains identifying information. Teacher identities are replaced by one token per subject. Check transcription with the original privately before submitting.

This is a candidate schedule generator from an existing timetable, not a whole-school scheduler from scratch. We have no authoritative multi-student enrollment, shared teacher timetable, classroom capacity, room-type eligibility, accessibility map, school-wide fixed lessons, semester calendar or validated travel measurements. Cross-class teacher/room conflicts cannot be certified without those datasets. Teachers are assumed available except for explicitly entered restrictions. A single student cannot attend overlapping classes because every position holds at most one lesson. Future extension should model shared lessons across students and use a global constraint solver after collecting authorized school data.

## Files
- index.html, style.css, app.js: browser interface.
- engine.js: input data, optimizer, metrics and validator; shared by browser and tests.
- test.js: automated tests.
- evidence/: real run logs and figures, plus browser verification notes.
- cover.png: AI-generated project cover (<5 MB).
- SUBMISSION_ZH.md: form text and accurate AI disclosure.
- GUIDE_ZH.md: local use, GitHub upload, Pages and submission steps.
- PRESENTATION_ZH.md: 5-minute demonstration and Q&A.
- TEAM.md: contribution record to complete honestly.

## Attribution / AI
ChatGPT generated the prototype code, tests, documentation and draft design; OpenAI image generation created the cover. Automated execution and browser checks were performed in the assistant environment. Students must review the implementation, run it themselves, document their actual contributions and explain it. Do not describe generated code as independently written by the team. Runtime uses only standard browser APIs; test runner uses Node standard libraries. Evidence plots were made with Python/matplotlib during preparation. The cover is an illustration, not test evidence.

Optional evidence-figure regeneration: install Python and matplotlib, then run `python make_evidence.py` after `node test.js`. The minute table reads the bundled minutes.json; if changing source data, regenerate it from engine.totals as well.
