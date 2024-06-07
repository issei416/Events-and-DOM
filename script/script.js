let spanElement = document.querySelector('#spanEle');

spanElement.addEventListener('mouseover',() => {
    let inCountElement = document.querySelector("#in_count");
    let inCount = Number(inCountElement.innerText);
    inCountElement.innerText=inCount+1;
    spanElement.style.color = `rgb(${Math.floor(Math.random()*225)},${Math.floor(Math.random()*225)},${Math.floor(Math.random()*225)})`
})

let clickme_btn = document.querySelector('#button');

clickme_btn.addEventListener('click',() => {
    let prompt = window.prompt("enter your message");
    let inCountElement = document.querySelector("#in_count");
    inCountElement.innerText=0;
    spanElement.innerText = prompt;
})

let h1 = document.querySelector('#header1');
let pos  = document.getElementById("pos");
h1.addEventListener('mousemove',({clientX,clientY}) => {
    console.log("event triggered",clientX,clientY);
    pos.innerText = `X:${clientX} , Y:${clientY}`;
})

let textarea = document.querySelector('#textarea');


textarea.addEventListener("keydown", () => {
    console.log("event occurs");
    let string = textarea.value;
    let count = document.querySelector('#count');
    count.innerText = string.length;
})

// converter functions 

function b2d(b) {
    b = Number(b);
    let res = 0;
    let power = 0;
    while(b>0){
        let x = b%10;
        b = Math.floor(b/10);
        if(x){
            res += Math.pow(2,power);
        }
        power+=1;
    }
    return res;
}

function d2b(d){
    d = Number(d);
    if(d == 0){
        return '0';
    }
    else {
        let res = '';
    while(d>1){
        let x = d%2;
        d = Math.floor(d/2);
        res = res + x; 
    }
    res += 1;
    let arr = res.split("");
    arr = arr.reverse();
    return arr.join("");
    }
}

let hex_arr = ['A','B','C','D','E','F'];

function hexanum(num) {;
    if(num<10){
        return num;
    }
    else {
        return hex_arr[num-10];
    }
}

function decinum(num) {
    if(!hex_arr.includes(num)){
        return Number(num);
    }
    else {
        return Number(hex_arr.indexOf(num.toUpperCase()))+10;
    }
}

function d2h(d) {
    d = Number(d);
    let res = '';
    if(d<16){
        return hexanum(d);
    }else {
        while(d>0){
            let x = d % 16;
            x = hexanum(x);
            d = Math.floor(d / 16);
            res += x;
        }
        let h_array = res.split("");
        h_array.reverse();
        return h_array.join("");
    }
}

function h2d(h) {
    let res = '';
    let input_array = h.split("");
    for(let input of input_array){
        if(hex_arr.includes(input)){
            let this_decinum = decinum(input);
            console.log("decnum:"+this_decinum);
            res = res + d2b(this_decinum);
        }else{
            out = d2b(Number(input));
            if(out.length == 3){
                res =res +  ('0' + out);
            }
            else if(out.length == 2){
                res = res + ('00' + out);
            }
            else if(out.length == 1){
                res =res +  ('000'+out);
            }
        }
    }
    let dec = b2d(res);
    return [dec,res];
}


// listenerts 

let convert_btn = document.querySelector('#convert');
let binary = document.querySelector('#binary');
let decimal = document.querySelector('#decimal');
let hexa = document.querySelector('#hexa');

decimal.addEventListener('focus', () => {
    binary.value = '';
    hexa.value = '';
})

hexa.addEventListener('focus',() => {
    binary.value = '';
    decimal.value = '';
})

convert_btn.addEventListener('click',()=>{
    if (binary.value) {
        let decimal_value = b2d(binary.value);
        decimal.value = decimal_value;
    }
    else if(decimal.value){
        let binary_value = d2b(decimal.value);
        let hexa_value = d2h(decimal.value);
        binary.value = binary_value;
        hexa.value = hexa_value;
    }
    else if(hexa.value){
        [decimal.value,binary.value] = h2d(hexa.value);
    }
})

