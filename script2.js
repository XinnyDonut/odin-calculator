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
displayArea.textContent="0";

allBtn.forEach(btn=>btn.addEventListener('click',function(){
    operatorBtn.forEach(btn=>btn.style.backgroundColor="blanchedalmond")
}))

clearBtn.addEventListener('click',e=>{
    displayArea.textContent="0";
    num1=null;
    num2=null;
    operator=null;
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
        num1=parseInt(displayArea.textContent);
    }

}))

operatorBtn.forEach(btn=>btn.addEventListener('click',e=>{

    btn.style.backgroundColor="orange"    
    switchScreen=true;
    if(num1==null){
        num1=parseInt(displayArea.textContent)    
    }
    if(operator==null){
        operator=btn.textContent;
    }else{
        num2=parseInt(displayArea.textContent)
        let result=operate(num1,num2,operator)

       if(result!=null){
            if(isTooLong(result)){
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
        num2=parseInt(displayArea.textContent);
        let result=operate(num1,num2,operator);
        if(result!=null){
            if(isTooLong(result)){
                result=result.toFixed(3)
            }
            displayArea.textContent=result; 
        }     
        num1=result;
        operator=null;
        num2=null;    
    }
})

function isTooLong(result){
    const resultString=result.toString();  
    const i=resultString.indexOf(".");
    const sub=resultString.substring(i+1);
    if(i===-1){
        return false;
    }
    return sub.length>3
    
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

