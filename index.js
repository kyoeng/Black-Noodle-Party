var introData = introData || [];
var mainData = mainData || [];


const limitContainer = document.getElementById("limit-container");
const skipBtn = document.getElementById("skip-intro-btn");


let introArr = [];      // intro 태그 배열



// 인트로 태그 만들기
function regIntro() {
    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < introData.length; i++) {
                const introBox = document.createElement("div");
                const introP = document.createElement("p");
            
                introBox.classList.add("intro-box");
                introP.classList.add("intro");
            
                introBox.appendChild(introP);
            
                for (const str of introData[i]) {
                    const span = document.createElement("span");
                    span.innerText = str;
                    introP.appendChild(span);
                }
            
                introArr.push(introBox);
            }

            for (const intro of introArr) {
                limitContainer.appendChild(intro);
            }

            resolve();
        } catch (error) {
            reject(error);
        }
    });
}



// 시작 버튼 만들기
function createStartBtn() {
    return new Promise((resolve, reject) => {
        try {
            const startBtn = document.createElement("button");
            startBtn.id = "start-btn";
            startBtn.innerText = "눌러줭~~!";
            startBtn.addEventListener("click", () => mainOn());
            introArr[introArr.length - 1].appendChild(startBtn);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}



// main 안 요소 만들기
function createMain() {
    return new Promise((resolve, reject) => {
        try {
            const main = document.createElement("div");
            main.id = "main-box";

            for (let i = 0; i < mainData.length; i++) {
                const commentBox = document.createElement("div");
                commentBox.classList.add("comment-box");

                const writer = document.createElement("div");
                writer.classList.add("writer");

                const img = document.createElement("div");
                img.classList.add("img");

                const writerName = document.createElement("p");
                writerName.innerText = mainData[i].name;

                writer.appendChild(img);
                writer.appendChild(writerName);
                commentBox.appendChild(writer);

                for (const str of mainData[i].comments) {
                    const comment = document.createElement("p");
                    comment.classList.add("comment");
                    comment.innerText = str;
                    commentBox.appendChild(comment);
                }

                main.appendChild(commentBox);
            }

            resolve(main);
        } catch (error) {
            reject(error);
        }
    });
}



// main box on
async function mainOn() {
    const main = await createMain();

    for (const intro of introArr) {
        intro.style.transition = "all 0s";
        intro.style.display = "none";
    }

    const effect = document.createElement("div");
    effect.id = "effect";

    limitContainer.appendChild(effect);
    limitContainer.appendChild(main);

    setTimeout(() => {
        effect.style.opacity = 0;
        effect.style.visibility = "hidden";
    }, 500);
}






/**
 * intro 동작 함수
 * @param {number} count 
 */
async function introAnimation(count) {
    // 이전꺼 넘기기
    if (count > 0) {
        introArr[count - 1].style.transform = "translateY(-80%)";
        introArr[count - 1].style.visibility = "hidden";
        introArr[count - 1].style.opacity = 0;
    }
    
    // 다음꺼 가져오기
    introArr[count].style.transform = "translateY(-50%)"
    introArr[count].style.visibility = "visible";
    introArr[count].style.opacity = 1;

    // 마지막이면 버튼 나오게
    if (count === introArr.length - 1) {
        await createStartBtn();
        
        setTimeout(() => {
            const startBtn = introArr[count].lastChild;
            startBtn.style.left = 0;
            skipBtn.style.visibility = "hidden";
        }, 4000);
    }
}




// *** Events ***
/**
 * onload 함수
 */
window.onload = async () => {
    await regIntro();

    for (let i = 0; i < introArr.length; i++) {
        setTimeout(() => introAnimation(i), (4000 * i));
    }
}


/**
 * 스킵 버튼 이벤트
 */
skipBtn.addEventListener("click", (e) => {
    e.target.style.visibility = "hidden";
    mainOn();
})