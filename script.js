// Function to update date and time
console.log(localStorage.getItem("theme"));
function updateDateTime() {
    const now = new Date();

    // Format the date: Day, Month DD
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();

    const dateString = `${dayOfWeek}, ${month} ${date}`;

    // Format the time: H:MM AM/PM
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    // const seconds = now.getSeconds().toString().padStart(2, "0");
    // const ampm = hours >= 12 ? "PM" : "AM";

    // hours = hours % 12;
    // hours = hours ? hours : 12;

    const timeString = `${hours}:${minutes}`;

    let timeOfDay = "Good morning";
    if (hours >= 17) {
        timeOfDay = "Good evening";
    } else if (hours >= 12) {
        timeOfDay = "Good afternoon";
    }

    document.getElementById("time-of-day").textContent = timeOfDay;
    document.getElementById("current-date").textContent = dateString;
    document.getElementById("current-time").textContent = timeString;
}

function setRandomColors() {
    const today = new Date();
    let seed =
        today.getFullYear() * 100 +
        (today.getMonth() + 1) * 100 +
        today.getDate();

    const random = function () {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const hue = Math.floor(random() * 360);
    document.documentElement.style.setProperty(
        "--accent-color",
        `hsl(${hue}, 100%, 50%)`
    );
}

const toggleSwitch = document.querySelector("#checkbox");

// Function to switch theme
function switchTheme(e) {
    try {
        if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        }
    } catch (error) {
        console.log("Error while switching theme:", error);
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);

function getCurrentTheme() {
    try {
        // Get theme from localStorage or use system preference as fallback
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme) {
            // If we have a saved preference, use it
            if (currentTheme === "dark") {
                toggleSwitch.checked = true;
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                toggleSwitch.checked = false;
                document.documentElement.removeAttribute("data-theme");
            }
        } else {
            // If no saved preference, check system preference
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                toggleSwitch.checked = true;
                document.documentElement.setAttribute("data-theme", "dark");
            }
        }
    } catch (error) {
        console.log("Error while getting current theme:", error);
        // If there's an error, default to light theme
        document.documentElement.removeAttribute("data-theme");
    }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    updateDateTime();
    setRandomColors();
    getCurrentTheme();

    // Update time every second
    setInterval(updateDateTime, 1000);
});

// Also keep the window.onload for backward compatibility
window.onload = function () {
    updateDateTime();
    setRandomColors();
    getCurrentTheme();
};

function searchGoogle() {
    const query = document.getElementById("search-input").value;
    if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
            query
        )}`;
    }
}
document
    .getElementById("search-button")
    .addEventListener("click", searchGoogle);
document
    .getElementById("search-input")
    .addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchGoogle();
        }
    });

setTimeout(() => {
    const videoBg = document.createElement("video");
    videoBg.src = "assets/wallpaper.mp4";
    videoBg.autoplay = true;
    videoBg.loop = true;
    videoBg.muted = true;
    // videoBg.id="bg-video";

    // CSS để ẩn video ban đầu
    videoBg.style.position = "fixed";
    videoBg.style.top = "0";
    videoBg.style.left = "0";
    videoBg.style.width = "100vw";
    videoBg.style.height = "100vh";
    videoBg.style.objectFit = "cover";
    videoBg.style.zIndex = "-100";
    videoBg.style.opacity = "0"; // Ẩn ban đầu
    videoBg.style.transition = "opacity 2s ease-in-out"; // Hiệu ứng fade-in

    const greet = document.getElementById("time-of-day");
    const curTime = document.getElementById("current-time");

    greet.style.color = "white";
    curTime.style.color = "white";

    document.body.appendChild(videoBg);
    document.body.style.background = "transparent"; // Ẩn màu nền cũ
    // Khi video đã load metadata (độ dài video), chọn thời gian ngẫu nhiên
    videoBg.addEventListener("loadedmetadata", () => {
        const duration = videoBg.duration;
        if (!isNaN(duration)) {
            videoBg.currentTime = Math.random() * duration; // Chọn điểm ngẫu nhiên
        }
    });

    // Kích hoạt hiệu ứng fade-in sau 100ms
    setTimeout(() => {
        videoBg.style.opacity = "1";
        videoBg.mute = false;
        videoBg.volume = 0.5;
    }, 100);
}, 3000);

// const videoBg = document.getElementById("bg-video");

// document.getElementById("unmute-btn").addEventListener("click", function () {
//     videoBg.muted = false; // Bật âm thanh
//     videoBg.play(); // Chạy lại video nếu bị pause
// });
