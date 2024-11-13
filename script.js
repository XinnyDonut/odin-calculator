let num1;
let num2;
let operator;
let operatorPressed=false;
let digitPressed=false;
const numArray=[];   

const equalBtn=document.querySelector('#equal')
const digitBtn=document.querySelectorAll(".num");
const operatorBtn=document.querySelectorAll('.operator')
const clearBtn=document.querySelector("#ac");
const displayArea=document.querySelector(".input");
operatorBtn.forEach(btn=>btn.addEventListener('click',e=>operatorPressed=true))
digitBtn.forEach(btn=>btn.addEventListener('click',e=>digitPressed=true))


setDisplay();
getNum();
calculate()
clear(clearBtn)


function setDisplay(){   
    digitBtn.forEach(btn=>btn.addEventListener('click',e=>{
        const value=btn.textContent;
        if(displayArea.textContent==''&&(value==0||value=='+'
            ||value=='-'||value=="*"||value=='/')){
                return;
        }

        if(operatorPressed){
            displayArea.textContent="";
            operatorPressed=false;
        }
        displayArea.textContent+=value;

    }))
}  



function getNum(){   
    digitBtn.forEach(btn=>btn.addEventListener('click',e=>{
        let value=btn.textContent;
        if(numArray.length==0&&value==0){
           return;
        }
        numArray.push(value);
        //console.log(numArray);     
             
    }));
    
    operatorBtn.forEach(btn=>btn.addEventListener('click',e=>{
        const num=parseInt(numArray.join(""));    
        //console.log(numArray)
        //num1 could also be the result of previous calculation,only get set num1 if num1 is null.
        if(num1==null){
            num1=num;
            numArray.splice(0,numArray.length);
            //console.log(`num1 is ${num1}`);
        }
        //user could use operator to get a result, in this case operator will be the same as the previous calculation.
        //only set operator if operator is null
        if(operator==null){
            operator=btn.textContent;
            console.log(`from num func operator is ${operator}`)
        //if num1 and operator are not null but num2 is null, if user press operator btn, it will set num2 same as num1;
        }else{
            if(numArray.length!=0){
                num2=num;
            }else{
                num2=num1;
            }     
        }
       
    }));

    equalBtn.addEventListener('click',e=>{
        const num=parseInt(numArray.join(""));
        numArray.splice(0,numArray.length);
        //console.log(numArray)
        num2=num;
        //console.log(`num2 is ${num2}`);        
    })
}


function calculate(){
    equalBtn.addEventListener('click',e=>{
        if(num1==null||num2==null||operator==null){
            return;
        }
       const result= operate(num1,num2,operator);
       displayArea.textContent=result;
       if(digitPressed){
         num1=null;
         num2=null;
         operator=null;
         digitPressed=false;
       }
       if(operatorPressed){
            num1=result;
            num2=null;
            // operator=null;
            operatorPressed=false;
       }   
    })
    operatorBtn.forEach(btn=>btn.addEventListener('click',e=>{
        console.log("clicked");
        console.log(`before cal num1 is ${num1}`);
        console.log(`before cal num2 is ${num2}`);
        console.log(`before cal operator is ${operator}`);
        if(num1!=null&&num2!=null&&operator!=null){
            const result=operate(num1,num2,operator);
            displayArea.textContent=result;
            num1=result;
            num2=null;
            operator=operatorBtn.textContent;
            numArray.splice(0,numArray.length);
            console.log("calculating....." )
            console.log(`after cal result is ${result}`)
            console.log(`after cal num1 is ${num1}`)
            console.log(`after cal num2 is ${num2}`)
            console.log(`after cal operator is ${operator}`)

        }
    }))
 }

function clear(clearBtn){
    clearBtn.addEventListener('click',e=>{
        displayArea.textContent="";
        num1=undefined;
        num2=undefined;
        operator=undefined;
        numArray.splice(0,numArray.length);
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

