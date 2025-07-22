const quotes = {
  happy: [
    "Keep shining, your smile is contagious 🌟",
    "Happiness looks so good on you! Stay blessed 😊",
    "You are a ray of sunshine! Keep spreading joy ☀️",
    "Your happiness is a gift to the world. Share it! 🎁",
],
  sad: [
    "It's okay to feel sad. I'm here with you 🤍",
    "Take a deep breath... you're doing better than you think.",
    "Remember, it's okay to not be okay. I'm here for you 🤗",
    "Sadness is just a chapter, not the whole story. Let's turn the page together 📖"
  ],
  stressed: [
    "Stress is temporary. You are stronger than it 💪",
    "Let's gently release that tension together 🌬️",
    "Take a moment to breathe. You got this! 🌿",
    "You are not alone in this. I'm here to support you 🤝"
    
  ]
};

const tips = {
  happy: [
    "Share your happiness with someone today! 😊",
    "Keep a gratitude journal  ",
    "Spend time with loved ones 👨‍👩‍👧‍👦",
    "Listen to your favorite music 🎵",
    "Go for a short nature walk 🌳",
    "Smile at a stranger today 😊",
    "Help someone out—it feels amazing 🤝",
    "Celebrate small wins 🏆",
    "Take a photo of something beautiful 📸"
  ],
   sad: [
    "Talk to a friend or family member 🤗",
    "Watch a funny movie or show 🎬",
    "Take a warm bath or shower 🛁",
    "Listen to uplifting music 🎶",
    "Practice mindfulness or meditation 🧘",
    "Go for a walk outside 🌤️",
    "Try some light exercise 🏃‍♀️",
    "Remember, it's okay to ask for help 💕"
  ],
  stressed: [
    "Try box breathing: In-4, Hold-4, Out-4 🌬️",
    "Do one thing at a time 📌",
    "Drink water slowly 💧",
    "Stretch your arms and back 🧘",
    "Put your phone away for 10 mins 📵"
  ]
 
};

const videos = {
  stressed: "https://youtu.be/15Qqhn6gGpE?si=csqgXYXRwn9ep2i1"
   
};


const quoteSection = document.getElementById("quote-section");
const quoteBox = document.getElementById("quote-box");
const nextButton = document.getElementById("next-button");
const timerSection = document.getElementById("timer-section");
const timerDisplay = document.getElementById("timer");
const tipsSection = document.getElementById("tips-section");
const tipsList = document.getElementById("tips-list");
const videoSection = document.getElementById("video-section");
const videoFrame = document.getElementById("videoFrame");


function selectMood(mood) {
  resetSections();

  
  if (mood === "happy") {
    quoteBox.innerText = getRandom(quotes.happy).toUpperCase();
    showHappyTips();
  } else if (mood === "sad") {
    quoteBox.innerText = getRandom(quotes.sad);
    nextButton.classList.remove("hidden");
    nextButton.innerText = "See Some relaxation Tips";
  }  else if (mood === "stressed") {
    quoteBox.innerText = getRandom(quotes.stressed);
    nextButton.innerText = "See Stress Tips";
    nextButton.classList.remove("hidden");
  }

  quoteSection.classList.remove("hidden");
}


function resetSections() {
  quoteSection.classList.add("hidden");
  timerSection.classList.add("hidden");
  tipsSection.classList.add("hidden");
  videoSection.classList.add("hidden");
  nextButton.classList.add("hidden");
  tipsList.innerHTML = "";
  videoFrame.src = "";
}


function showHappyTips() {
  tipsSection.classList.remove("hidden");
  tips.happy.forEach((tip, i) => {
    const div = document.createElement("div");
    div.innerText = `${i + 1}. ${tip}`;
    tipsList.appendChild(div);
  });
}


function startBreathing() {
  quoteSection.classList.add("hidden");
  timerSection.classList.remove("hidden");

  let time = 20; // 20 seconds
  timerDisplay.innerText = time;

  const countdown = setInterval(() => {
    time--;
    timerDisplay.innerText = time;
    if (time <= 0) {
      clearInterval(countdown);
      alert("Good job! Feeling a little better now? 🤗");
      alert("please give me a rating for my mental wellness assistant ");
    }
  }, 1000);
}
// 🌟 Save Feedback to localStorage
function submitFeedback() {
  const name = document.getElementById("userName").value.trim();
  const mood = document.getElementById("userMood").value;
  const rating = document.getElementById("rating").value;

  if (!name || !mood) {
    alert("Please fill out your name and mood.");
    return;
  }

  const feedback = {
    name,
    mood,
    rating,
    time: new Date().toLocaleString()
  };

  let allFeedbacks = JSON.parse(localStorage.getItem("feedbackList")) || [];
  allFeedbacks.push(feedback);
  localStorage.setItem("feedbackList", JSON.stringify(allFeedbacks));

  alert("Thank you for your feedback!");
  document.getElementById("userName").value = "";
  document.getElementById("userMood").value = "";
  document.getElementById("rating").value = "3";
  document.getElementById("ratingValue").textContent = "3";
}

// 🔐 Unlock Admin View
function unlockAdmin() {
  const password = document.getElementById("adminPassword").value;
/**
 * The secret password used for authentication.
 * @type {string}
 * @private
 */
  const correctPassword = "Kalai2004"; // Change to your secret

  if (password === correctPassword) {
    document.getElementById("feedback-history").classList.remove("hidden");
    showFeedbackHistory();
    alert("✅ Admin Access Granted");
  } else {
    alert("❌ Incorrect Password");
  }
}

// 📜 Show All Feedback (Only for Admin)
function showFeedbackHistory() {
  const feedbackContainer = document.getElementById("feedback-carousel");
  const feedbacks = JSON.parse(localStorage.getItem("feedbackList")) || [];

  feedbackContainer.innerHTML = "";
  feedbacks.forEach(fb => {
    const card = document.createElement("div");
    card.className = "feedback-card";
    card.innerHTML = `
      <p><strong>${fb.name}</strong> (${fb.mood})</p>
      <p>⭐ ${fb.rating}/5</p>
      <small>${fb.time}</small>
    `;
    feedbackContainer.appendChild(card);
  });
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerText.includes("Tips")) {
    tipsSection.classList.remove("hidden");
    tips.stressed.forEach((tip, i) => {
      const div = document.createElement("div");
      div.innerText = `• ${tip}`;
      tipsList.appendChild(div);
    });

    
    setTimeout(() => {
      const watch = confirm("Would you like to watch a stress relief video?");
      if (watch) {
        videoSection.classList.remove("hidden");
        videoFrame.src = videos.stressed;
      }
    }, 800);
  }
});


function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
// 🔒 Disable Right-Click
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// 🔒 Disable Dev Tools
document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) // Ctrl+Shift+I or J
  ) {
    return false;
  }
};
// Update rating value on slider move
const ratingSlider = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");

if (ratingSlider && ratingValue) {
  ratingSlider.addEventListener("input", function () {
    ratingValue.textContent = this.value;
  });
}
