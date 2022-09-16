const question = document.querySelector('.question'), 
		numberOfQuestion = document.querySelector('.question__number'),
		numberOfAllQuestions = document.querySelector('.question__all-numbers')

const options = document.querySelectorAll('.answers__option')
const option_1 = document.querySelector('.answers__option-1'), 
      option_2 = document.querySelector('.answers__option-2'), 
      option_3 = document.querySelector('.answers__option-3'), 
      option_4 = document.querySelector('.answers__option-4')


const nextBtn = document.querySelector('.quiz__btn')

const tracker = document.querySelector('.quiz__tracker')

const correctAnswers_popup = document.querySelector('.popup__correct'), 
		numberOfAllQuestions_popup = document.querySelector('.popup__all-questions'), 
		tryAgainBtn_popup = document.querySelector('.popup__try-again');


const popup = document.querySelector('.popup')

let indexOfQuestions, 
	 indexOfPage = 0

let score = 0

const questions = [

	{
		question: `In sports, What does NBA stands for?`,
		options: [
			`National Bussiness Association`, 
			`National Basketball Association`,
			`Not Boring at All`,
			`National Beef Association`,
		], 
		rightAnswer: 1, 
	},

	{
		question: `In soccer, what body part can't touch the ball`,
		options: [
			`Feets`,
			`Knees`,
			`Hands`, 
			`Head`,
		], 
		rightAnswer: 2, 
	},

	{
		question: `The Olympics are held every how many years?`,
		options: [
			`4 years`, 
			`5 years`,
			`3 years`,
			`6 years`,
		], 
		rightAnswer: 0, 
	},

	{
		question: `Name the largest country`,
		options: [
			`United States`, 
			`Canada`,
			`Russia`,
			`China`,
		], 
		rightAnswer: 2, 
	},

	{
		question: `Name the smallest country`,
		options: [
			`Peru`, 
			`San Marino`,
			`Malta`,
			`The Vatican City`,
		], 
		rightAnswer: 3, 
	},

	{
		question: `Which is the capital of France?`,
		options: [
			`Marsella`, 
			`Paris`,
			`Lyon`,
			`Montpellier`,
		], 
		rightAnswer: 1, 
	},
	{
		question: `What type of creature is Shrek?`,
		options: [
			`Minotaur`, 
			`Elf`,
			`Zombie`,
			`Ogre`,
		], 
		rightAnswer: 3, 
	},
	{
		question: `Who directed Pulp Fiction?`,
		options: [
			`Steven Spielberg`, 
			`Quentin Tarantino`,
			`Martin Scosese`,
			`Christopher Nolan`,
		], 
		rightAnswer: 1, 
	},
	{
		question: `Which color are the Na'Vi in Avatar?`,
		options: [
			`Purple`, 
			`Black`,
			`Blue`,
			`Red`,
		], 
		rightAnswer: 2, 
	},
	{
		question: `Is pluto a planet?`,
		options: [
			`Yes`, 
			`No`,
			`Maybe`,
			`I don't know`,
		], 
		rightAnswer: 1, 
	},
	{
		question: `What is the smallest unit of matter?`,
		options: [
			`Nucleus`, 
			`Atom`,
			`Neutrons`,
			`Protons`,
		], 
		rightAnswer: 1, 
	},
	{
		question: `How many elements are in the periodic table?`,
		options: [
			`115`, 
			`117`,
			`118`,
			`114`,
		], 
		rightAnswer: 2, 
	},
	{
		question: `Jared Leto is the frontman of what band?`,
		options: [
			`30 Seconds to Mars`, 
			`Greenday`,
			`One Direcion`,
			`The Beatles`,
		], 
		rightAnswer: 0, 
	},
	{
		question: `Queen's first music video?`,
		options: [
			`Under Pressure`, 
			`Don't Stop Me Now`,
			`I Want to Break Free`,
			`Bohemian Rhapsody`,
		], 
		rightAnswer: 3, 
	},
	{
		question: `Michael Jackson Thriller music video feature what creature?`,
		options: [
			`Skeletons`, 
			`Zombies`,
			`Ogres`,
			`Elfs`,
		], 
		rightAnswer: 1, 
	},

]


numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestions].question;

	option_1.innerHTML = questions[indexOfQuestions].options[0];
	option_2.innerHTML = questions[indexOfQuestions].options[1];
	option_3.innerHTML = questions[indexOfQuestions].options[2];
	option_4.innerHTML = questions[indexOfQuestions].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;

	indexOfPage ++;
}



let completedAnswers = []

const randomQuestion =  () => {
	let randomNumber = Math.floor(Math.random() * questions.length)
	let hitDuplicate = false;

	if (indexOfPage == questions.length){
		quizFinish()
	} else {
		if (completedAnswers.length > 0) {
			completedAnswers.forEach(item => {
				if (item == randomNumber) {
					hitDuplicate = true
				}
			});
			if (hitDuplicate) {
				randomQuestion()
			} else {
				indexOfQuestions = randomNumber
				load()
			}
		}
		if (completedAnswers == 0) {
			indexOfQuestions = randomNumber
			load();
		}
	}
	completedAnswers.push(indexOfQuestions)
};


const checkAnswer = e => {
	if (e.target.dataset.id == questions[indexOfQuestions].rightAnswer) {
		e.target.classList.add('_right')
		score++
	} else{
		e.target.classList.add('_wrong')
		updateAnswerTracker('_wrong')
	}
	disabledOptions()
};



const disabledOptions = () => {
	options.forEach(item => {
		item.classList.add('_disabled')
		if (item.dataset.id == questions[indexOfQuestions].rightAnswer) {
			item.classList.add('_right')
		}
	})
}

const enabledOptions = () => {
	options.forEach(item => {
		item.classList.remove('_disabled', '_right', '_wrong')
	})
}

const validate = () => {
	if (!options[0].classList.contains('_disabled')) {
		alert('Choose one of the answer options')
	} else {
		randomQuestion()
		enabledOptions()
	}
}


nextBtn.addEventListener('click', validate)


options.forEach(item => {
	item.addEventListener('click', e => checkAnswer(e))
})

const quizFinish = () => {
	popup.classList.add('_open')
	document.body.classList.remove('_lock')
	correctAnswers_popup.innerHTML = score
	numberOfAllQuestions_popup.innerHTML = questions.length
};

tryAgainBtn_popup.addEventListener('click', () => {
	window.location.reload()
})

window.addEventListener('load', () => {
	randomQuestion();
})


function setFavicons(favImg){
  let headTitle = document.querySelector('head');
  let setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel','shortcut icon');
  setFavicon.setAttribute('href',favImg);
  headTitle.appendChild(setFavicon);
}
setFavicons('icons8-quiz-65.png');