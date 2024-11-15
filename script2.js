let num1=null;
let num2=null;
let operator=null;
let switchScreen=false;
let highlighted=false;

const allBtn=document.querySelectorAll('button');
const equalBtn=document.querySelector('#equal')
const digitBtn=document.querySelectorAll(".num");
const operatorBtn=document.querySelectorAll('.operator')
const clearBtn=document.querySelector("#ac");
const displayArea=document.querySelector(".input");
const percentBtn=document.querySelector('#percent')
const floatPointBtn=document.querySelector('#float')
displayArea.textContent="0";

allBtn.forEach(btn=>btn.addEventListener('click',function(){
    operatorBtn.forEach(btn=>btn.style.backgroundColor="blanchedalmond")
}))

percentBtn.addEventListener('click',function(){
    displayNum=parseFloat(displayArea.textContent)
    if(isTooLong(displayNum)){
        displayNum.toFixed(6)
    }
    displayArea.textContent=displayNum*0.01
    if(num1!=null&&operator==null){
        num1=num1*0.01
    }
})

clearBtn.addEventListener('click',e=>{
    displayArea.textContent="0";
    num1=null;
    num2=null;
    operator=null;
})

floatPointBtn.addEventListener('click',function(){
    str=displayArea.textContent
    if(displayArea.textContent!=""&&!str.includes(".")){
        displayArea.textContent+="."
    }
})



digitBtn.forEach(btn=>btn.addEventListener('click',e=>{
    const value=btn.textContent;
       
    if (displayArea.textContent === "0") {
        displayArea.textContent = "";
    }         
    displayArea.textContent += value; 
    
    if(displayArea.textContent==""&&(value==0||value=='+'
        ||value=='-'||value=="*"||value=='/')){
        displayArea.textContent=0;
    }
    if(switchScreen){
        displayArea.textContent="";
        displayArea.textContent+=value;
        switchScreen=false;
    }
    if(num1!=null&&operator==null){
        num1=parseFloat(displayArea.textContent);
    }
   
}))

operatorBtn.forEach(btn=>btn.addEventListener('click',e=>{

    btn.style.backgroundColor="orange"    
    switchScreen=true;
    if(num1==null){
        num1=parseFloat(displayArea.textContent)    
    }
    if(operator==null){
        operator=btn.textContent;
    }else{
        num2=parseFloat(displayArea.textContent)
        let result=operate(num1,num2,operator)

       if(result!=null){
            if(isTooLong(result,10)){
                result=result.toFixed(3)  
            }    
            displayArea.textContent=result; 
        } 
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
        num2=parseFloat(displayArea.textContent);
        let result=operate(num1,num2,operator);
        if(result!=null){
            if(isTooLong(result,10)){
                result=result.toFixed(3)  
            }    
            displayArea.textContent=result; 
        }     
        num1=result;
        operator=null;
        num2=null;    
    }
})

function isTooLong(result,length){
    const resultString=result.toString();  
    const i=resultString.indexOf(".");
    const sub=resultString.substring(i+1);
    if(i===-1){
        return false;
    }
    return sub.length>length
    
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
    if(b==0){
        displayArea.textContent="invalid";
        return null;
    }else{
        return a/b;
    }  
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
        default:
        return null;
    }
}

