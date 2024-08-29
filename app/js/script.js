const darkInput = document.getElementById("dark");
const lightInput = document.getElementById("light");

const setColorMode = () => {
    console.log("setColorMode");
    console.log(localStorage.getItem("colorMode"));
    if(localStorage.getItem("colorMode") == "dark"){
        setDarkMode();
    }else if(localStorage.getItem("colorMode") == "light"){
        setLightMode();
    }
};

const checkMode = () => {
    if(localStorage.getItem("colorMode") == null){
        if(window.matchMedia("(prefers-color-scheme : light)").matches) {
            lightInput.checked = "true";
        }else if(window.matchMedia("(prefers-color-scheme : dark)").matches){
            darkInput.checked = "true";
        }
    }
};

const checkModeChange = () => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        checkMode();
    });
};

const setDarkMode = () => {
    document.querySelector("body").classList = "dark";
    darkInput.checked = "true";
    localStorage.setItem("colorMode", "dark");
};

const setLightMode = () => {
    document.querySelector("body").classList = "light";
    lightInput.checked = "true";
    localStorage.setItem("colorMode", "light");
};

setColorMode();
checkMode();
checkModeChange();

const radioButtons = document.querySelectorAll(".toggle__wrapper input");

radioButtons.forEach(button => {
    button.addEventListener("click", event => {
        if(darkInput.checked){
            setDarkMode();
        }
        else{
            setLightMode();
        };
    });
});

