/**
 * Mascot ("little me") configuration.
 *
 * Until the PNGs exist, the mascot renders a drawn placeholder face.
 * To switch to your images:
 *   1. Put neutral.png, happy.png, sad.png, peek.png in public/avatar/
 *   2. Set useImages: true
 *   3. Tune `eyes` so the pupils sit inside the white eye shapes
 *      (x/y are % of the image's width/height, measured to each eye's centre).
 */
export const avatar = {
  useImages: false,
  images: {
    neutral: '/avatar/neutral.png',
    happy: '/avatar/happy.png',
    sad: '/avatar/sad.png',
    peek: '/avatar/peek.png',
  },
  // Pupils are drawn only on the images that have empty eyes (neutral, peek).
  eyes: {
    neutral: [
      { x: 39, y: 44 },
      { x: 61, y: 44 },
    ],
    peek: [
      { x: 39, y: 52 },
      { x: 61, y: 52 },
    ],
  },
  pupilSize: 4.5, // % of image width
  pupilTravel: 2.2, // how far pupils can move from centre, % of image width
};

/**
 * What little-me asks. One question per visit; `when` filters by context.
 * mood: 'happy' | 'sad' decides the reaction face and the exit animation.
 * action: 'copyEmail' copies your email; 'feedback' opens a short text box.
 */
export const mascotQuestions = [
  {
    id: 'ultra',
    when: (ctx) => ctx.visitedUltra,
    question: 'So… did you enjoy the ultra version? 👀',
    answers: [
      { label: 'It was sick', mood: 'happy', reply: 'Yesss. Took way too many nights to build 😄' },
      { label: 'Not my thing', mood: 'sad', reply: "Fair… that's why the normal one exists 🥲" },
    ],
  },
  {
    id: 'impression',
    question: "Hey, it's me 👋 How's the portfolio so far?",
    answers: [
      { label: 'Loving it', mood: 'happy', reply: 'Made my day! Open a project card, the details are the good part.' },
      { label: "It's okay", mood: 'happy', reply: "I'll take it. Try the button in the corner if you're bored 😉" },
      { label: 'Not great', mood: 'sad', reply: 'Ouch. Noted, I will make it better 🥲' },
    ],
  },
  {
    id: 'connect',
    question: "I'm open to roles right now. Want to connect?",
    answers: [
      { label: "Sure, let's talk", mood: 'happy', action: 'copyEmail', reply: 'Email copied! Talk soon 🙌' },
      { label: 'Maybe later', mood: 'sad', reply: "Okay… I'll be here, compiling 🥲" },
    ],
  },
  {
    id: 'objection',
    question: "Honest question: is there any reason you wouldn't hire me?",
    answers: [
      { label: 'Nope, looks strong', mood: 'happy', reply: "That's the dream. Resume's at the top 😄" },
      { label: 'Yes, actually…', mood: 'sad', action: 'feedback', reply: "Thanks for being honest. I'll work on it 🥲" },
    ],
  },
];
