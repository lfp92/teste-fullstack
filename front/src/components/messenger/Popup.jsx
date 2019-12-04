import './Popup.css';

function Popup(waitTime) {
    let div = document.createElement("div");
    div.className = "popup";
    div.innerHTML = "<div>Notificação</div>"
    this.show = () => {
        document.body.appendChild(div);
        div.style.animationPlayState = "running";
        setTimeout(() => {
            div.style.animationPlayState = "paused";
            setTimeout(() => {
                div.style.animationDirection = "reverse";
                div.style.animationPlayState = "running";
                this.removeAfterTime(500);
            }, waitTime || 2500);
        }, 500);
    }

    this.removeAfterTime = time => {
        setTimeout(() => {
            document.body.removeChild(div);
        }, time);
    }
}

function pop() {
    var popup = new Popup(5000);
    popup.show();
}

export default pop;