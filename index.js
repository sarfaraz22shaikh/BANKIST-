'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Sarfaraz Shaikh',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, 
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-10-22T17:01:17.194Z",
    "2023-10-25T23:36:17.929Z",
    "2023-10-26T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: 'Prathamesh Chaudhary',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-07-25T14:18:46.235Z",
    "2020-07-23T16:33:06.386Z",
    "2020-07-24T14:43:26.374Z",
    "2020-07-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: 'Harshal patil',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Prasad Chinchole',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




const formatmovementdate = function(date){
  const caldaybetween = (date1 , date2) => Math.abs((date2 - date1) /( 1000 * 60 * 60 * 24 ));
  const daypassed = Math.round(caldaybetween(new Date() , date));
  if(daypassed === 0) return 'today';
  if(daypassed === 1) return 'yesterday';
  if(daypassed <= 7) return `${daypassed} days ago`;
  else{
  //   
  return new Intl.DateTimeFormat(currentaccount.locale , date);
  }
};

const displayMovement = function(acc , sort = false){
  const moves = sort ? acc.movements.splice().sort((a,b) => b-a ) : acc.movements;
    moves.forEach(function(mov , i){
        const type = mov > 0 ? 'deposit' : 'withdraw';
        const date = new Date(acc.movementsDates[i]);
  const displaydate = formatmovementdate(date) ;
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1}</div>
          <div class="movements__date">${displaydate}</div>
          <div class="movements__value">${mov.toFixed(2)}💲</div>
        </div>`
        containerMovements.insertAdjacentHTML('afterbegin',html);
    });
    };
const updateUi = function(acc){
  //display movement
displayMovement(acc);
//display balance
calcdisplayBalance(acc);
// display summary
calulatedisplaysummary(acc.movements);
};
    const createusername = function(accounts){
      accounts.forEach(function(acc){
        acc.username = acc.owner.toLowerCase().split(' ').map(function(iteam){
          return iteam[0];
        }).join('');
      });
}
createusername(accounts);
console.log(account1.username)
const calcdisplayBalance = function(account){
 account.balance =  account.movements.reduce((acc , cur) => acc + cur,0);
  labelBalance.textContent = `${account.balance.toFixed(2)}💲`;
}

const calulatedisplaysummary = function(movements){
  const income = movements.filter(mov => mov > 0).reduce((acc , mov) => acc+mov);
  labelSumIn.textContent = `${income.toFixed(2)}💲`;
};

const displayout = function(acc){
  const out = acc.movements.filter((mov)=>mov<0).reduce((acc,curr)=> acc+curr);
  console.log(`-----${out}`);
labelSumOut.textContent = `${out.toFixed(2)}💲`;

const interest = acc.movements.filter((mov) => mov>0).map((mov) => mov * (acc.interestRate)).filter((mov , i ,arr) => {
  return mov >1;
}).reduce((acc , curr)=>acc+curr,0);
labelSumInterest.textContent = `${interest}💲`;
};
const movements = [430, 1000, 700, 50, 90];

const EUROtousd = 1.1;
const totaldeposit = movements.filter((mov) => mov>0).map((mov , i , arr) => {console.log(arr);
  return (mov * EUROtousd)}).reduce((acc , curr) => acc + curr ,0);
  console.log(`${totaldeposit}💲`);
  console.log(account1.movements);
  // const firstwidthdraw = account1.movements.find((mov) => mov < 0);
  // console.log(firstwidthdraw);
  const firstwidthdraw = account1.movements.forEach((mov) => {
    if(mov < 0){
      return mov;

    };
  });
  const startlogouttimer = function(){
    // set time to 5 min
    let time = 10;
    // call the set interval everysecond and decrease time by 1 sec
    const tick = function(){
      const min = String(Math.floor(time/60)).padStart(2 , 0);
      const sec = String(time % 60).padStart(2 , 0);
      labelTimer.textContent = `${min} : ${sec}`;
      // decrease time
      if(time === 0){
        labelWelcome.textContent = `login to get started`;
        containerApp.style.opacity = 0;
      }
      time--;
    };
    tick();
    setInterval(tick ,1000);
  }
  let currentaccount;
  // fake login 88888
  // currentaccount = account1;
  // updateUi(currentaccount);
  // containerApp.style.opacity = 100;

  // <-------------experimenting using international date-------->  //
const now = new Date();
const options = {
  hour : 'numeric',
  minute : 'numeric',
  day : 'numeric',
  month : 'numeric',
  year : 'numeric',
  // weekday : '',
};
// const locale = currentaccount.locale;
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat(locale , options).format(now);


  btnLogin.addEventListener("click" , function(e){
    e.preventDefault();
  currentaccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentaccount);
  if(currentaccount?.pin === Number(inputLoginPin.value)){
    console.log(`login`);
    labelWelcome.textContent = `wellcome back ${currentaccount.owner.split(' ')[0]}`
    // console.log(`wellcome back ${currentaccount.owner.split(' ')[0]}`);
    containerApp.style.opacity = 100;
    //clearing input field
    inputLoginUsername.value = inputLoginPin.value = ` `;
    const now = new Date();
  const day = `${now.getDate()}`.padStart(2 , 0);
  const month = `${now.getMonth()+1}`.padStart(2,0);
  const year = now.getFullYear();
  const hour =  now.getHours();
  const min = now.getMinutes();
  labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;
    // inputLoginUsername.style.opacity = 0;
    // inputLoginPin.style.blur(;
    // btnLogin.style.blur(3px);
    const locale = currentaccount.locale;
labelDate.textContent = new Intl.DateTimeFormat(locale , options).format(now);

 updateUi(currentaccount);
 startlogouttimer();
  }
  });
btnTransfer.addEventListener("click" , function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveracc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ` `;
  if(amount > 0 && currentaccount.balance >= amount && receiveracc?.username !== currentaccount.username){
    //doing transition
    currentaccount.movements.push(-amount);
    currentaccount.movementsDates.push(new Date());
    // receiveracc.movements.push(amount);
    // receiveracc.movementsDates.push(new Date());
    updateUi(currentaccount);
  }
  
});
btnClose.addEventListener("click" , function(e){
e.preventDefault();
if(inputCloseUsername.value === currentaccount.username && currentaccount.pin === Number(inputClosePin.value)){
  const index = accounts.findIndex((acc) => acc.username === currentaccount.username);
  accounts.splice(index , 1);
  containerApp.style.opacity = 0;
}
inputCloseUsername.value = inputClosePin.value = ` `;
});

btnLoan.addEventListener("click" , function(e){
  e.preventDefault();
  const amount = Number(Math.floor(inputLoanAmount.value));
  if(amount > 0 && currentaccount.movements.some((mov) => mov >= amount/10)){
    setTimeout(function(){currentaccount.movements.push(amount);
    currentaccount.movementsDates.push(new Date().toISOString());
    //update ui
    updateUi(currentaccount);} , 2500)
  }
});

const allmovements = accounts.map((acc) => acc.movements).flat();
console.log(allmovements);
let sorted = false;
btnSort.addEventListener("click" , function(e){
  e.preventDefault();
  console.log(`sort button clicked`);
  displayMovement(currentaccount.movements , !sorted);
  sorted = !sorted;
});
////////////////////////fill method
// new aarray method and fill method
const x = new Array(8);
console.log(x.fill(3,3,5));
// array.from method
let a = 1;
const y = Array.from({length : 100} , () => Math.trunc(Math.random() * 6)+1);
console.log(y);
labelBalance.addEventListener('click' , function(){
console.log(Array.from(document.querySelectorAll('.movements__value') ,  el => Number(el.textContent.replace('💲' , ' '))));
  // const movementsUI = Array.from(document.querySelectorAll('movements__value') , el => el.textContent.replace('💲' , ' '));
  // // console.log(movementsUI);
});
const totaldepo = accounts.map((acc) => acc.movements).flat().filter((mov) => mov>0).reduce((acc , curr) => acc+curr , 0);
console.log(`total deposit is ${totaldepo}`);
const deopsit1000 = accounts.map((acc) => acc.movements).flat().filter((mov) => mov>1000).reduce((acc , curr) => acc + 1 , 0);
console.log(`there are ${deopsit1000} users which have deposited above 1000`);
const {deposit , withdraw}  = accounts.flatMap((acc) => acc.movements).reduce((sum , curr) => {
  curr > 0 ? sum.deposit += curr : sum.withdraw +=curr ;
return sum },{deposit:0 , withdraw:0}
)
console.log(deposit , withdraw);
const convertTotitle  = function(title){
  const exception = ['a' , 'an' , 'the' , 'but' , 'or', 'on' ,'is'];
  const totitlecase = title.toLowerCase().split(' ').map(el => {
    if(exception.includes(el)) return el;
    else return el.replace(el[0] , el[0].toUpperCase())
  }).join(' ');
  return totitlecase;

};
console.log(convertTotitle('this IS a tiTLE case ON the'));
const dogs = [
{weight : 22 , curFood : 250 , owner : ['Alice' , 'Bob'] ,},
{weight : 8 ,curFood : 200 ,owner : ['Matilda'] ,},
{weight : 13 ,curFood : 275 ,owner : ['sarah' , 'john'] ,},
{weight : 32 ,curFood : 340 ,owner : ['Michale'] ,},
];
dogs.map((el) => {
  el.recommended_food = el.weight ** 0.75 * 28});
const ownerEatstomuch = dogs.filter((el) =>el.curFood > el.recommended_food);
console.log(ownerEatstomuch);
// console.log(parseInt('23.45xmer'));
// console.log(Number.isInteger(34));
console.log(Math.ceil(22.1));
console.log(Math.round(22.6));
console.log(Math.round(24.5));
labelBalance.addEventListener('click', function(){
  [...document.querySelectorAll('.movements__row')].forEach((row ,i) => {
    if(i % 2 === 0) row.style.backgroundColor = 'Orangered';
  });
});
// console.log(new Date('2023-4-23'));
//operation on date method
// const caldaybetween = (date1 , date2) => Math.abs((date2 - date1) /( 1000 * 60 * 60 * 24 ));
// console.log(caldaybetween(new Date(2023 , 3 ,14) , new Date(2023 , 3 ,24)));
// const num = 322476.44;
// console.log(`${navigator.language}` , new Intl.NumberFormat(navigator.language).format(num));
// const ingredient = ['olive' , 'palakh'];
// const pizza = setTimeout((ing1 , ing2) => console.log(`here is your pizza 🍕 with ${ing1} and ${ing2}`) , 4000 , ...ingredient);
// if(ingredient.includes('spanish')){ clearTimeout(pizza)};
// setInterval(() => {
//   const date = new Date();
//   const hr = date.getHours();
//   const min = date.getMinutes();
//   const sec = date.getSeconds();
//   console.log(`${hr} : ${min} ${sec}`);
// },1000);
