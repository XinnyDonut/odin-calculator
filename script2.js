let num1=null;
let num2=null;
let operator=null;
let operatorPressed=false;
let digitPressed=false;
let equalPressed=false;
let switchScreen=false;
const numArray=[];   

const equalBtn=document.querySelector('#equal')
const digitBtn=document.querySelectorAll(".num");
const operatorBtn=document.querySelectorAll('.operator')
const clearBtn=document.querySelector("#ac");
const displayArea=document.querySelector(".input");

clearBtn.addEventListener('click',e=>{
    displayArea.textContent="";
    num1=null;
    num2=null;
    operator=null;
    numArray.splice(0,numArray.length);
})
operatorBtn.forEach(btn=>btn.addEventListener('click',e=>operatorPressed=true))
digitBtn.forEach(btn=>btn.addEventListener('click',e=>digitPressed=true))
equalBtn.addEventListener('click',e=>equalPressed=true)

digitBtn.forEach(btn=>btn.addEventListener('click',e=>{
    const value=btn.textContent;
    displayArea.textContent+=value; 
    if(displayArea.textContent==''&&(value==0||value=='+'
        ||value=='-'||value=="*"||value=='/')){
        displayArea.textContent=0;
    }
    if(switchScreen){
        displayArea.textContent="";
        displayArea.textContent+=value;
        switchScreen=false;
    }
    if(num1!=null&&operator==null){
        num1=parseInt(displayArea.textContent);
    }
    
   
}))

operatorBtn.forEach(btn=>btn.addEventListener('click',e=>{
    switchScreen=true;
    if(num1==null){
        num1=parseInt(displayArea.textContent)    
    }
    if(operator==null){
        operator=btn.textContent;
    }else{
        num2=parseInt(displayArea.textContent)
        result=operate(num1,num2,operator)
        displayArea.textContent=result
        num1=result;
        operator=btn.textContent;
        if(num2==null){
            num2=result;
        }
        
    }
    }))

equalBtn.addEventListener('click',e=>{
    switchScreen=true;
    if(num1==null||operator==null){
        return
    }
    if(num1!=null&&operator!=null){
        num2=parseInt(displayArea.textContent);
        result=operate(num1,num2,operator);
        displayArea.textContent=result;
        num1=result;
        operator=null;
        num2=null;    
    }
})

function clear(clearBtn){
    clearBtn.addEventListener('click',e=>{
        
    })   
}

function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
function operate(a,b,operator){
    switch(operator){
        case'+':
        return add(a,b);
        break;
        case'-':
        return subtract(a,b);
        break;
        case'*':
        return multiply(a,b);
        break;
        case'/':
        return divide(a,b);
        break;
    }
}

