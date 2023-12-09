// Daily Planner using DayJS API
// By: Ryan Hanzel

// Global Variables
const now = dayjs();
const nowFormat = now.format('MMMM DD, YYYY [at] hh:mm A');
const mainEL = document.getElementById('container');
const headerEl = document.getElementById('header');
const footerEl = document.getElementById('footer');
const timeEl = document.getElementById('date-time');
const intervalID = setInterval(reloadPage, 60000);

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('unload', function() {
    clearInterval(intervalID);
})

// Functions
function init() {
    timeEl.textContent = nowFormat;
    console.log(nowFormat);
    timeBlocks(mainEL);
    intervalID;
};
function timeBlocks(data) {
    for (let i = 0; i < 9; i++) {
        let hour = i + 9;
        if (hour > 12) {
            hour = hour - 12;
        };
        const isPastTime = dayjs().hour() > hour;
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');
        const timeEl = document.createElement('div');
        timeEl.classList.add('col-2');
        timeEl.textContent = `${hour}:00`;
        const taskEl = document.createElement('div');
        taskEl.classList.add('col-8');
        taskEl.classList.add('task');
        taskEl.setAttribute('id', `task-${i}`);
        taskEl.setAttribute('contenteditable', 'true');
        taskEl.textContent = localStorage.getItem(`task-${i}`);
        const saveEl = document.createElement('div');
        saveEl.classList.add('col-2');
        const saveBtn = document.createElement('button');
        saveBtn.classList.add('saveBtn');
        saveBtn.textContent = 'Save';
        saveBtn.addEventListener('click', function() {
            localStorage.setItem(`task-${i}`, taskEl.textContent);
        });
        if (isPastTime) {
            rowEl.classList.add('past');
        } else {
            rowEl.classList.add('time-block');
        }
        data.appendChild(rowEl);
        rowEl.appendChild(timeEl);
        rowEl.appendChild(taskEl);
        rowEl.appendChild(saveEl);
        saveEl.appendChild(saveBtn);
    };
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clearBtn');
    clearBtn.textContent = 'Clear Schedule';
    clearBtn.addEventListener('click', function() {
        localStorage.clear();
        reloadPage();
    });
    footerEl.appendChild(clearBtn);
};
function reloadPage() {
    location.reload();
    console.log('Page Reloaded');
}