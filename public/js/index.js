// Socket connection init
const socket = io()

// Screens
const startScreen = document.getElementById('startScreen')
const homeScreen = document.getElementById('homeScreen')
const createScreen = document.getElementById('createScreen');
const joinScreen = document.getElementById('joinScreen');
const waitingScreen = document.getElementById('waitingScreen');
const gameScreen = document.getElementById('gameScreen');
const winnersScreen = document.getElementById('winnersScreen');



// Buttons
const chooseHome = document.getElementById('chooseHome');
const chooseCreate = document.getElementById('chooseCreate');
const chooseJoin = document.getElementById('chooseJoin');
const chooseMode1 = document.getElementById('chooseMode1');
const chooseMode2 = document.getElementById('chooseMode2');
const chooseMode3 = document.getElementById('chooseMode3');
const chooseMode4 = document.getElementById('chooseMode4');
const chooseMode5 = document.getElementById('chooseMode5');
const chooseMode6 = document.getElementById('chooseMode6');
const chooseMode7 = document.getElementById('chooseMode7');
const chooseMode8 = document.getElementById('chooseMode8');
const chooseMode9 = document.getElementById('chooseMode9');
const chooseCreateConfirm = document.getElementById('chooseCreateConfirm');
const chooseJoinConfirm = document.getElementById('chooseJoinConfirm');
const chooseStart = document.getElementById('chooseStart');
const confirPin = document.getElementById('confirmPin');
const nextMap = document.getElementById('nextMap');

// Random
const modeImg = document.getElementById('modeImg');
const errorMessage = document.getElementById('errorMessage');
const modeCard1 = document.getElementById('modeCard1');
const modeCard2 = document.getElementById('modeCard2');
const modeCard3 = document.getElementById('modeCard3');
const modeCard4 = document.getElementById('modeCard4');
const modeCard5 = document.getElementById('modeCard5');
const modeCard6 = document.getElementById('modeCard6');
const modeCard7 = document.getElementById('modeCard7');
const modeCard8 = document.getElementById('modeCard8');
const modeCard9 = document.getElementById('modeCard9');
const streetView = document.getElementById('street-view');
const disDisplay = document.getElementById('disDisplay');
const playersList = document.getElementById('playersList');
const playersScore = document.getElementById('playersScore');
const roundDis = document.getElementById('roundDis');
const timeDis = document.getElementById('timeDis');
const winnersList = document.getElementById('winnersList');

// Input
const chooseCreateName = document.getElementById('chooseCreateName');
const chooseCreateRoom = document.getElementById('chooseCreateRoom');
const chooseJoinName = document.getElementById('chooseJoinName');
const chooseJoinRoom = document.getElementById('chooseJoinRoom');



let isModeChosen = false;
let mode = '';
let host = '';
let player = '';
let playerId = 0;
let roomId = '';
let locIndex;
let destination;
let nextCnt = 0;
let round = 1;
let stopCounter = false;
const chosenLocs = {};


const loc = ['']


const worldLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637485175121!6m8!1m7!1sCAoSLEFGMVFpcE5FaEE3TEV2RzROMlJlRkJLWVF1LW05MWFCbWp1dFNmNjhmSVVx!2m2!1d31.414199!2d27.00780599999996!3f278.0911907616493!4f-14.090972151271899!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485200420!6m8!1m7!1sCAoSLEFGMVFpcE1jd0xBbU5Xb2dldC05dTVsVDNpVWRKM1J3UWhqNnFid0NnZFJk!2m2!1d47.3335256283636!2d59.13815036416053!3f39.805034934991944!4f-27.57345567400084!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485234449!6m8!1m7!1sCAoSLEFGMVFpcE5FeExOZERvRE1uR0lfNWNCSWtTQmpTQlRoM0E5U0d5T1NvblRm!2m2!1d61.48495552497919!2d6.754121817648411!3f70.44646698395478!4f-2.933334837682949!5f2.0200036773138703" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485290208!6m8!1m7!1sCAoSLEFGMVFpcE1obUNQdDhyYzN5d0RhUVdaZ0xlak43azdQTFZJQXZjMnNHS0M0!2m2!1d35.78050933087022!2d-90.70798154414928!3f203.87427206199487!4f-12.818030012036289!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485557329!6m8!1m7!1sCAoSLEFGMVFpcE9Rc3BiTzVfUm42M0l1eXJqaHdDeE9NYkdDR0RjZVdLNGQ4TzBH!2m2!1d-16.71966487324859!2d-71.31520577428005!3f155.18732998863055!4f-10.75050431614713!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485634866!6m8!1m7!1szsb5XsI7nuIqQ5k2XquuAg!2m2!1d53.35261145091351!2d-110.8554815197637!3f266.2917779052468!4f-6.736912627265383!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485658557!6m8!1m7!1syRMVn52g_tAMLdWgnpZ6Hg!2m2!1d54.71785460283225!2d-113.2842670479706!3f13.45009728952914!4f-9.460703515929211!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485703731!6m8!1m7!1sCAoSLEFGMVFpcE1kRi1WSWwwWUFRd3NOU3dpS3dpZWFBbElCejBjRHI2R2xsZEdG!2m2!1d47.486059!2d3.907368!3f215.44661976284732!4f-16.018845767787397!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485788100!6m8!1m7!1sCAoSLEFGMVFpcFBqdVJLRWpwUms3bUo2Z3dhbl9yZXZtaHFnX1AxbVRzUW9zaGg0!2m2!1d52.50441561746677!2d13.33519142073011!3f104.52834252726156!4f-6.578042429805819!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485837836!6m8!1m7!1sCAoSLEFGMVFpcE5vRUNmTzk4bU1JZU5oTV80Si0wR0pSVTdMQnJGU1dCWGtIbTJD!2m2!1d50.12746006586569!2d8.891759257124153!3f299.58335199574304!4f-9.757145928174594!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485867206!6m8!1m7!1sCAoSLEFGMVFpcE9DYjdfaGI0R01zSWNzMUI3Vk5zQ19OQ05CVkE2TnN1UlIybVR6!2m2!1d48.8613085721185!2d2.335389330983162!3f122.0530125857174!4f6.106578264905863!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485905186!6m8!1m7!1sCAoSLEFGMVFpcE9lTU1WZmxjVHFmMllZZTRKQjc2d25mM1JfN2JMMk5YTnplbzNK!2m2!1d41.88933333333333!2d12.49133333333339!3f279.1941554294443!4f-5.951535496124549!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485931993!6m8!1m7!1sCAoSLEFGMVFpcE5ITW4tQlFPb3NPYUxCMjFGSU16eUF2YXNHZk9jcmlKOThBTVpV!2m2!1d42.75992343!2d11.11359459!3f153.0693862791769!4f-8.621457710956903!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485990776!6m8!1m7!1sCAoSLEFGMVFpcE0zWHFYQU81QU5NY2JGMzhvbThRNXQ3WFdmVnQxWEhjZ3lxa3hr!2m2!1d59.32626024326464!2d18.08212707303337!3f9.026319912837835!4f-10.74746876553968!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe></iframe>'];


const famousLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637839636598!6m8!1m7!1si0BnBFVNYD0u-LjaPfT_Ig!2m2!1d27.17371271115795!2d78.04199633586421!3f7.479905994001285!4f12.470959617267297!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637839695042!6m8!1m7!1swROd1Fp1I5q7D0ApCxDCaw!2m2!1d28.52504010829838!2d77.18539619260048!3f172.07051949563655!4f21.774915717693787!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637839796792!6m8!1m7!1sRX3hFZkLw25TpLab3IDaFg!2m2!1d48.85717912330423!2d2.296643061618369!3f317.047829226944!4f31.33394146168908!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637839880681!6m8!1m7!1szzWKU9YJQR8ikoxcT1oGOA!2m2!1d25.1973409443283!2d55.27337521322483!3f89.84176146426343!4f56.28306294299077!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const naLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637832575976!6m8!1m7!1sCAoSLEFGMVFpcE40R0tkTUZONGRyZlk4OEZ3V3VLa0VfZXBZY19iZFlZRHk1Q1pT!2m2!1d40.70482690001091!2d-73.99017167999517!3f275.40866443346977!4f-6.056322507423857!5f0.9717701081263649" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832605884!6m8!1m7!1sCAoSLEFGMVFpcE9fMnRzbzMzV0tOYWM1NjB5Wk45NHVzWnJ3QmlxU01RNEY1Wm11!2m2!1d39.95222106169634!2d-75.16250399944833!3f333.8380933087782!4f-8.86176007350916!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832654589!6m8!1m7!1sEB0XepK2Yuewsct2Pf-Ucw!2m2!1d38.90309847893553!2d-77.03648777966912!3f356.34311574935776!4f-8.406228419571008!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832721393!6m8!1m7!1spi2QPgUuCkG-pkOEH6AwOA!2m2!1d39.85057196346999!2d-86.14575244984947!3f170.82780642388866!4f-10.210105252982842!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832762078!6m8!1m7!1sCAoSLEFGMVFpcFBNM082V2xfQjN3UDVkRWN3SHVNWW05U0xra1RGNDc2T3pMOEhl!2m2!1d50.4848722!2d-104.3405833!3f98.01984670673592!4f-14.498253305468296!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832784061!6m8!1m7!1sq1T6fMd9da56H4N_uzckjg!2m2!1d47.07117389737355!2d-109.4111727670959!3f175.63674120269013!4f-12.667266928590251!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832845644!6m8!1m7!1sCAoSLEFGMVFpcE5NVDhlU1kyQmE4ZzhGd0dGeEdFaVBQMEN2X2x4V3FDeFJJVHB4!2m2!1d22.14930961492133!2d-100.9774823800279!3f174.7528230734282!4f-2.6702561609722864!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const saLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637832890491!6m8!1m7!1sXR3A33ccIkaMIk1fizRcbQ!2m2!1d-10.93958131454156!2d-69.56720729946694!3f273.39125935554404!4f-7.6904457997953415!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834007525!6m8!1m7!1szst0k2YqdIsQVnW-6KgwIw!2m2!1d-35.65874433402659!2d-63.7563087588347!3f336.1423940881988!4f-6.736266959869454!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834045608!6m8!1m7!1sCAoSLEFGMVFpcE5scHpxbE1tUDlycGp1NEFmS2kxaG8wRjdUTW1jU2pFT1Eyem5L!2m2!1d-34.58679006260881!2d-58.39193583484739!3f149.5038903878047!4f-3.6053035991015747!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834085998!6m8!1m7!1sr-hhyxb5XbUPvtkHxOmKFA!2m2!1d-35.11786355780791!2d-65.39356863396071!3f265.7810383584665!4f1.1568529796321343!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834122765!6m8!1m7!1s-nmoYe1T9OppyXMbalU_Dg!2m2!1d-33.46721089890352!2d-70.62649380880686!3f182.5164205955976!4f-8.174291458863024!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834195435!6m8!1m7!1sj18C1pLrEigxOtjh04eFaQ!2m2!1d-26.64485037693573!2d-69.94646389508843!3f8.843835243223737!4f-12.073848360522277!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834232350!6m8!1m7!1sIU9wYbMKL1JFoSbW-KB1rw!2m2!1d-20.38337250852792!2d-63.40369890909822!3f8.571334131981835!4f-8.1464724082673!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const auLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637834271127!6m8!1m7!1s6MY5YerrlTzMSelfaLQCpw!2m2!1d-26.27607875062295!2d133.1880118464087!3f87.69052472704719!4f-10.588022962317751!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834303604!6m8!1m7!1sCAoSLEFGMVFpcE9ZZG5HVl9xS1A1RFpCUmdvTFJ4dFhlcVNVZi02YWRHd0RvVER2!2m2!1d-31.9507227654221!2d115.8581394329667!3f218.45888122890688!4f17.26842887652353!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834332725!6m8!1m7!1sCog513sN70rlQSOml_j4TA!2m2!1d-26.24792049161332!2d114.4029159229895!3f345.01027168655656!4f-20.328558922805357!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834373192!6m8!1m7!1sjhcLOdk1-gdYOlzm3uQfVA!2m2!1d-25.50531332454217!2d113.5106660516342!3f44.693650345875284!4f-9.469513426836187!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834404256!6m8!1m7!1sCAoSLEFGMVFpcE5VVldydFl3Vmt4djhZTGEweHFWcGcwcE41Z0FQMW9UQmxDc201!2m2!1d-27.4722167!2d153.0396861!3f313.7550882122487!4f8.32502223286653!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834425430!6m8!1m7!1s0kr1e4GsfdnCvNoSTpAEFQ!2m2!1d-27.52660181040405!2d153.0956676303504!3f204.8571992282422!4f-11.379452356068981!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834445200!6m8!1m7!1so9GU7k0lwia1j1Je3Y6z3Q!2m2!1d-27.30222138968247!2d152.9734822638954!3f122.70799896785809!4f-8.062929179135295!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834464543!6m8!1m7!1sFiaLqo1QFSpV__m4eiOAXA!2m2!1d-26.89418902031042!2d152.2895206554807!3f99.59847148491171!4f-18.95262776434292!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834498379!6m8!1m7!1s9YlTyBGu9FnGuz5IDdLgMg!2m2!1d-25.97403461984053!2d153.0732320749023!3f307.36877944211767!4f-21.748025640283913!5f0.7752103442288524" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834519382!6m8!1m7!1s9D_jmjWyj-a2qimHZvpkLg!2m2!1d-25.52937031916751!2d152.6981789376062!3f144.00452190433995!4f-3.623744673606211!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const midLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637766546747!6m8!1m7!1sCAoSLEFGMVFpcFBsMWZaZ2Z2aTh5dHFSV016LUNwMTZHWnh1VG1iN3Axd2toTmRZ!2m2!1d26.37280387731565!2d50.20053812525813!3f199.70012546041275!4f-1.6182314593301754!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766583870!6m8!1m7!1sCAoSLEFGMVFpcE1hN0VKcUpQMFQyOUtvNVQ3cXVTczBxOHdNcjhEQVFDYXkxN0ZI!2m2!1d25.37811365846945!2d49.58889037896495!3f175.03765529937658!4f-1.7233271668865484!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637766611562!6m8!1m7!1sCAoSLEFGMVFpcE15Y2pBbUVodzI2cWN1dW5VVE9tcHdYTGxWS2dPWkZtdHBlS1c3!2m2!1d26.75843840184502!2d49.86412111041801!3f153.3078404178569!4f-19.599816626932522!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766631176!6m8!1m7!1sCAoSLEFGMVFpcE1YWDVCa0o5NlBvOVNHXy12VjlKQ3ZUazZzNmlONHkzTjctWmpL!2m2!1d26.22951698275732!2d50.51164817808993!3f283.42659935660834!4f5.29647628117398!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766657240!6m8!1m7!1sCAoSLEFGMVFpcE9KN1YtN2FvWHZuQnJ3TjNLUUQ4cE5aR3A4QVZVY1R3cDdSRlBp!2m2!1d25.46085613207438!2d50.93830245684913!3f131.57570474185857!4f-13.276571841111945!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766704895!6m8!1m7!1sCAoSLEFGMVFpcE94aE9Cazh4UUUyMWQ1d0VGU1lVQ0xmdExMcDNxRk9QMmo4WXl6!2m2!1d25.26790373802225!2d51.54898146932145!3f157.4844463619166!4f-10.962266361446467!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766775685!6m8!1m7!1sCAoSLEFGMVFpcE11R2Fqa1dUOXRMcnJkTFRjQzJVSllRRzNLU2w2NE1rSjhjcm53!2m2!1d25.25643330171658!2d51.52379497414881!3f320.30462228057274!4f5.502938596850456!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766849331!6m8!1m7!1s8fcioXpatFnoKuw5ecAx0A!2m2!1d25.1424088641492!2d55.20637766576499!3f59.67916238280179!4f-21.565274686368184!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766924304!6m8!1m7!1sffoIV_dyMhnprWILMGSlHw!2m2!1d25.13122035413065!2d55.11582469781331!3f318.15599446160195!4f-10.704236250884804!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766981891!6m8!1m7!1s_8vVEAEjkeWILB7N4A5WwQ!2m2!1d25.20848417509764!2d55.27308933474806!3f34.62009402865255!4f17.592288851802834!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767006390!6m8!1m7!1s8CCC9CYd6y44c4u13dUhGA!2m2!1d25.84093402211047!2d56.0003778007377!3f231.8388290967671!4f-11.322970100048721!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767111101!6m8!1m7!1sCAoSLEFGMVFpcE1SWUgyM1A4VVAyWXlYOThRWGdHT0pfUEM1UkFiNmR1QnQxNmpP!2m2!1d23.62798847128645!2d58.27118728463382!3f62.09117364070332!4f4.582767229085974!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767128340!6m8!1m7!1sCAoSLEFGMVFpcE9xYTBfM2k0ZEh6TUw0QW9YdGRGeGQyUnVxRkoxNUIyY1FUdDUw!2m2!1d23.66055488718278!2d58.17222209233972!3f54.443258110177695!4f-11.67400542445344!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767211718!6m8!1m7!1sCAoSLEFGMVFpcE1oamtBYmhMOV80eVJQQVRiMDlBY3BOZHYxZ0l6RU1KekFjTlVy!2m2!1d34.5505717!2d38.2687133!3f20.47834874957465!4f-11.521653357966414!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const euLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637755105548!6m8!1m7!1sDr9azfhx_QYT49FoJhJWgQ!2m2!1d42.60415809347631!2d-6.808044018693965!3f234.82383958941068!4f-17.653029445623517!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755141691!6m8!1m7!1sCAoSLEFGMVFpcE9vbVRxekRiNG9tT1A4bmlVZHprdGNhRHR1QnlpVmhRYkdVRVhS!2m2!1d38.69741695826331!2d-9.20588381588459!3f97.01600368413021!4f-9.118598333717173!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755165177!6m8!1m7!1sCAoSLEFGMVFpcE1GNjRNZ2dGdDdaQy1zVGoxcTZoay0xakppVW1PcGhjU0xLTVhy!2m2!1d40.2023613784016!2d-8.433658077903587!3f168.3152293419058!4f-17.603778776819652!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755205116!6m8!1m7!1sCAoSLEFGMVFpcE42RDdtUGExaXZyaFFLZGh2dzVDOHo5Z2V4aHc1TGVkLUFFX2Z3!2m2!1d38.79312189707685!2d-9.388549625873566!3f42.07226107119251!4f-27.91430844559911!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755228288!6m8!1m7!1sCAoSLEFGMVFpcFBrMGdPN3RabzhjMVYtVzY2YjZwdF9xTl9fcVZPcEpIX2E2ZkRY!2m2!1d41.14247980746057!2d-8.61207766185214!3f342.6511155176127!4f-27.024210185032317!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755252149!6m8!1m7!1sCAoSLEFGMVFpcFBCQkxlbUoyN2t1UU5tRGpkQkptQXkxUllHSTA1LXhObkpKWWdk!2m2!1d40.41748469494325!2d-3.714404500667513!3f119.47916076330796!4f4.055420763909339!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755279493!6m8!1m7!1sCAoSLEFGMVFpcE80dHhBTzh5eEZuMWRlYVJ5UmJVY1VMYnh4a2J0NDFqa1RPYTRx!2m2!1d39.47905539432694!2d-0.3761323036577551!3f268.44278243011047!4f-15.409535594557468!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755314418!6m8!1m7!1sCAoSLEFGMVFpcE5ILWt6OU5GNWhFNzNZTFVpanBkMjB1VU5VMFltNFVpYjhXdkl3!2m2!1d37.37793346465958!2d-5.987707077058383!3f312.4809512963298!4f-14.266954613752333!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755363078!6m8!1m7!1spfQwfPqt4GFXopLoq8GwEA!2m2!1d39.75379574011438!2d-3.160502084456325!3f230.64816753902136!4f0.24588980886078105!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755390929!6m8!1m7!1sCAoSLEFGMVFpcE4tN3RBemFIY1VBRkxuY2dsZW9ZNUdhcVd1TlBfVVBzczNoMTcz!2m2!1d52.39969374771587!2d13.04837178909295!3f4.877416882397995!4f17.361263381114256!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763147129!6m8!1m7!1sCAoSLEFGMVFpcE5XYkNDbUR2a2Q1UlhYcWdYSjNFenVlcmpUeHFkb3gtZGtaWVUz!2m2!1d49.46119501318083!2d8.985217809677124!3f172.68914421741246!4f-13.917990317100163!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763182298!6m8!1m7!1sCAoSK0FGMVFpcFBVME84bV81UnVrcGR3bERKN1BwdnJvYTVlWjQ2Q0dpZDljQXM.!2m2!1d49.52149239905423!2d8.52445769760294!3f23.389529925147826!4f5.5808482567434226!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763229859!6m8!1m7!1sjEReqzcO5MG0B-baxdEg3g!2m2!1d50.84352514359861!2d4.354923531074831!3f51.15201423699256!4f-7.611675625613628!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763253417!6m8!1m7!1soyjJ6pqCqamV2ALx4z4cMA!2m2!1d50.89228060383997!2d4.329454573104063!3f46.780754486836!4f-33.699622507555716!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763272090!6m8!1m7!1s6yKE8G63pxooZuvoWd01Gg!2m2!1d50.88682960579505!2d4.423199857840319!3f202.62213!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763310112!6m8!1m7!1sZSGTsTEvr5X-UVWcpq8I_Q!2m2!1d50.9696551049902!2d4.435398934639928!3f235.20732913696563!4f-8.119403964587832!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763352311!6m8!1m7!1svb7xO8ebPLvirkOgDhzvDA!2m2!1d52.36223831409466!2d4.887190980662381!3f15.937186096678865!4f-29.435366089738665!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763374822!6m8!1m7!1s5-BcoWo5IQwqy3Pk6W7KkQ!2m2!1d52.37304160342561!2d4.901986257705474!3f318.84854963018483!4f-21.819275567915014!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763418067!6m8!1m7!1sCAoSLEFGMVFpcFB6dG9QN2tPb0dDY1YyVnkwWFpGLWNlX0NaNXJ6TVM0R3pCTWR0!2m2!1d52.36670448753176!2d4.892976992108515!3f226.83952085018444!4f-9.481255380671357!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763437337!6m8!1m7!1s1LO8_a317oQOf8-cPH-o6w!2m2!1d52.40515945540756!2d4.807628421337417!3f86.7902291423377!4f-12.265723148333223!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const asLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637763486047!6m8!1m7!1sCAoSLEFGMVFpcE1qRXR4a1EwYUtHMWJVZXRkSlc3SFF1ck81YnJIbnlkeTJNR19y!2m2!1d16.2474727!2d80.4328468!3f285.8309540177902!4f3.6481562778518537!5f0.8048898943586006" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763562846!6m8!1m7!1sCAoSLEFGMVFpcFBtYnFBUDRwUURfWmxyUmhYUWRxUkpYd1B5VnpscHQ0aXI2dEIw!2m2!1d19.27356891617881!2d72.96037872065813!3f83.89440256792737!4f-33.54458798607312!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763601348!6m8!1m7!1sCAoSLEFGMVFpcFBqbmpCZnhjVGVlU0J1TEx6VkhKbVRXTmJLU2lhZENQQWQwYk4w!2m2!1d21.7814795!2d70.1241553!3f274.67052648199683!4f-7.1038503860283555!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763630654!6m8!1m7!1sCAoSLEFGMVFpcE5oR09nQktLTHJNV1BqbV96OUhyeG1XSmNjdFJlMS1yU2NrRlQ1!2m2!1d28.1968861!2d73.7819748!3f211.88864253482214!4f-10.888978239627448!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637766485423!6m8!1m7!1sCAoSLEFGMVFpcE0wRGVYT3Y3bDE4V1E0V2p3SENCSzVjZnpKbjdKMEY4M0s0dFJm!2m2!1d10.7462256!2d76.6712006!3f183.60654841439413!4f-11.816463906544428!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832223784!6m8!1m7!1sqpegKn6ZyXkh-TzfVSBpWw!2m2!1d3.111594830225445!2d101.6500598572299!3f88.9767209978281!4f-4.181583953445966!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832247113!6m8!1m7!1s_9yZw3TEybJQBvN4CC4Ciw!2m2!1d3.196821998558784!2d101.681012791155!3f103.67647970661024!4f-1.4110509490646592!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832274275!6m8!1m7!1sruABaytTqJfsSBGg1i_TWA!2m2!1d3.011220742269916!2d101.4560257259276!3f46.35631137711259!4f1.060603570011864!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832319193!6m8!1m7!1sOdPNFTCF6WEi3mFp5SI1lA!2m2!1d3.236895276270819!2d101.6766188510498!3f338.4845542876269!4f-18.07845085786616!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832344132!6m8!1m7!1sCAoSLEFGMVFpcE85SW54QXRTM1JmT1lCaU1nZTdsQndpSGJCVzZFcDkwT2NkVFUx!2m2!1d1.28479917!2d103.85880231!3f261.0513061051303!4f-12.24536722059446!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832388634!6m8!1m7!1skiP5f2WuJ0rSMm8IAZM8Qg!2m2!1d1.336245634130267!2d103.7467895280482!3f249.02174878940073!4f-25.32096621585019!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832423484!6m8!1m7!1sk7VjBo0CSPTeduG5c96ODg!2m2!1d1.326824010569114!2d103.9185028735887!3f170.79968820015395!4f-13.605224302287226!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832473831!6m8!1m7!1sl15m0GwBpg6MjElS-B45hQ!2m2!1d3.764271067744127!2d103.217352758581!3f294.6673691002639!4f-11.609731331697631!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832510019!6m8!1m7!1sYMhnlnU1lpxgP794iQdFVQ!2m2!1d13.80081230467736!2d100.5356188426214!3f280.4680415405998!4f-6.094101153967344!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


const afLocs = [];


// chooseCreate.classList.remove('active-btn');
// chooseHome.classList.add('active-btn');

chooseHome.addEventListener('click', () => {
    createScreen.style.display = 'none';
    joinScreen.style.display = 'none';
    winnersScreen.style.display = 'none';
    waitingScreen.style.display = 'none';

    chooseJoin.classList.remove('active-btn');
    chooseCreate.classList.remove('active-btn');
    chooseHome.classList.add('active-btn');

    homeScreen.style.display = 'flex';
})

chooseCreate.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    winnersScreen.style.display = 'none';
    joinScreen.style.display = 'none';
    waitingScreen.style.display = 'none';

    chooseHome.classList.remove('active-btn');
    chooseJoin.classList.remove('active-btn');
    chooseCreate.classList.add('active-btn');

    createScreen.style.display = 'flex';
})

chooseJoin.addEventListener('click', () => {
    homeScreen.style.display = 'none';
    createScreen.style.display = 'none';
    winnersScreen.style.display = 'none';
    waitingScreen.style.display = 'none';

    chooseHome.classList.remove('active-btn');
    chooseCreate.classList.remove('active-btn');
    chooseJoin.classList.add('active-btn');

    joinScreen.style.display = 'flex';
})

chooseJoinConfirm.addEventListener('click', () => {
    player = chooseJoinName.value;
    roomId = chooseJoinRoom.value;
    socket.emit('join-room', {player, roomId});
})

chooseMode1.addEventListener('click', () => {
    modeCard1.classList.add('mode-card-active');
    chooseMode1.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='world';


    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode2.addEventListener('click', () => {
    modeCard2.classList.add('mode-card-active');
    chooseMode2.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='famous';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode3.addEventListener('click', () => {
    modeCard3.classList.add('mode-card-active');
    chooseMode3.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='northamerica';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode4.addEventListener('click', () => {
    modeCard4.classList.add('mode-card-active');
    chooseMode4.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='southamerica';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode5.addEventListener('click', () => {
    modeCard5.classList.add('mode-card-active');
    chooseMode5.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='middleeast';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode6.addEventListener('click', () => {
    modeCard6.classList.add('mode-card-active');
    chooseMode6.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='europe';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode7.addEventListener('click', () => {
    modeCard7.classList.add('mode-card-active');
    chooseMode7.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='asia';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode8.addEventListener('click', () => {
    modeCard8.classList.add('mode-card-active');
    chooseMode8.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='australia';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard9.classList.remove('mode-card-active');
    chooseMode9.innerHTML = 'Choose';
})

chooseMode9.addEventListener('click', () => {
    modeCard9.classList.add('mode-card-active');
    chooseMode9.innerHTML = '<i class="fas fa-check-circle"></i> Chosen';
    modeImg.style.borderTopRightRadius = '0px';
    modeImg.style.borderTopLeftRadius = '0px';
    isModeChosen = true;
    mode='africa';

    modeCard1.classList.remove('mode-card-active');
    chooseMode1.innerHTML = 'Choose';
    modeCard3.classList.remove('mode-card-active');
    chooseMode3.innerHTML = 'Choose';
    modeCard4.classList.remove('mode-card-active');
    chooseMode4.innerHTML = 'Choose';
    modeCard5.classList.remove('mode-card-active');
    chooseMode5.innerHTML = 'Choose';
    modeCard2.classList.remove('mode-card-active');
    chooseMode2.innerHTML = 'Choose';
    modeCard6.classList.remove('mode-card-active');
    chooseMode6.innerHTML = 'Choose';
    modeCard7.classList.remove('mode-card-active');
    chooseMode7.innerHTML = 'Choose';
    modeCard8.classList.remove('mode-card-active');
    chooseMode8.innerHTML = 'Choose';
})


chooseCreateConfirm.addEventListener('click', () => {
    host = chooseCreateName.value;
    roomId = chooseCreateRoom.value;
    socket.emit('create-room', {host, mode, roomId});
})

chooseStart.addEventListener('click', () => {
    socket.emit('start-game', roomId)
})

socket.on('game-display', rooms => {
    if(mode=="world"){
        genRandWorld();
    }else if(mode=="famous"){
        genRandFamous();
    }
    else if(mode=="northamerica"){
        genRandNA();
    }
    else if(mode=="southamerica"){
        genRandSA();
    }
    else if(mode=="middleeast"){
        genRandMid();
    }
    else if(mode=="europe"){
        genRandEur();
    }
    else if(mode=="asia"){
        genRandAsia();
    }
    else if(mode=="australia"){
        genRandAus();
    }
    else if(mode=="africa"){
        genRandAfr();
    }
    roundDis.innerHTML = "<span class='round' style='color: white;'>Round:" + round + "/10</span>";
    playersScore.innerHTML = '<tr><th>Players</th><th>Score</th></tr>';
    initMap();
    startScreen.style.display = 'none';
    waitingScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    for(let i=0; i<rooms.length; i++){
        playersScore.innerHTML+='<tr><td style="color: white;">' + rooms[i][4] + '</td><td style="color: white;">0</td></tr>';
    }
})

function genRandWorld(){
    locIndex = Math.floor(Math.random(worldLocs.length)*worldLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
    

        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandWorld();
    }
}
function genRandFamous(){
    locIndex = Math.floor(Math.random(famousLocs.length)*famousLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandFamous();
    }
}
function genRandMid(){
    locIndex = Math.floor(Math.random(midLocs.length)*midLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandMid();
    }
}
function genRandAsia(){
    locIndex = Math.floor(Math.random(asLocs.length)*asLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandAsia();
    }
}
function genRandNA(){
    locIndex = Math.floor(Math.random(naLocs.length)*naLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandNA();
    }
}
function genRandSA(){
    locIndex = Math.floor(Math.random(saLocs.length)*saLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandSA();
    }
}
function genRandAus(){
    locIndex = Math.floor(Math.random(auLocs.length)*auLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandAus();
    }
}
function genRandAfr(){
    locIndex = Math.floor(Math.random(afLocs.length)*afLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandAfr();
    }
}
function genRandEur(){
    locIndex = Math.floor(Math.random(euLocs.length)*euLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
        
        // const revGeo = 'https://open.mapquestapi.com/geocoding/v1/reverse?key=VhCAzoCdq1iw3EUcNRezRhbXmIdsfxq9&location='+destLat+','+destLong+'&includeRoadMetadata=true&includeNearestIntersection=true';
        // fetch(revGeo)
        // .then(function(response){
        //     return response.json();
        // })
        // .then(function(data){
        //         destination = data.results[0].locations[0].street + ' ' + data.results[0].locations[0].adminArea1 + ' ' + data.results[0].locations[0].adminArea3 + ' ' + data.results[0].locations[0].adminArea5;
        // });
    }else{
        genRandEur();
    }
}


confirPin.addEventListener('click', () => {
    confirPin.innerText = 'Confirmed!';
    disDisplay.innerHTML = '<p>You are <b id="distance"></b> km out!</p>';
    confirPin.disabled = true;
    socket.emit('user-confirmed');
})

nextMap.addEventListener('click', () => {
    nextCnt++;
    round++;
    roundDis.innerHTML = "<span class='round' style='color: white;'>Round:" + round + "/5</span>";
    if(nextCnt==5){
        socket.emit('round-over', roomId);        
    }
    confirPin.disabled = false;
    disDisplay.innerHTML = '';
    initMap();
    if(mode=="world"){
        genRandWorld();
    }else if(mode=="famous"){
        genRandFamous();
    }
    else if(mode=="northamerica"){
        genRandNA();
    }
    else if(mode=="southamerica"){
        genRandSA();
    }
    else if(mode=="middleeast"){
        genRandMid();
    }
    else if(mode=="europe"){
        genRandEur();
    }
    else if(mode=="asia"){
        genRandAsia();
    }
    else if(mode=="australia"){
        genRandAus();
    }
    else if(mode=="africa"){
        genRandAfr();
    }
})

socket.on('display-error', message => {
    // errorMessage.style.display = 'block';
    // errorMessage.innerText = message
    alert(message);
})

socket.on('room-created', () => {
    playerId = 1;
    createScreen.style.display = 'none';
    waitingScreen.style.display = 'block';
    chooseCreate.disabled = true;
    chooseJoin.disabled = true;
    // nextMap.style.display = 'block';
})

socket.on('host-connected', (host, roomId) => {
    playersList.innerHTML = "<span><i style='color: green; font-weight: bold;' class='fas fa-circle'></i> " + host + "</span><br>";
})

socket.on('player-connected', (rooms, roomId) => {
    playersList.innerHTML = '';
    for(let i=0; i<rooms.length; i++){
        playersList.innerHTML += "<span><i style='color: green;' class='fas fa-circle'></i> " + rooms[i][4] + "</span><br>";
    }
})

socket.on('room-joined', (roomId, pId) => {
    playerId = pId;
    createScreen.style.display = 'none';
    joinScreen.style.display = 'none';
    chooseStart.style.display = 'none';
    waitingScreen.style.display = 'block';
    chooseCreate.disable = true;
    chooseJoin.disable = true;
})


socket.on('street-display', (locIndex, Cmode) => {
    var myVar;
    clearTimeout(myVar);
    confirPin.innerText = 'Confirm';
    mode = Cmode;
    initMap();
    let link;
    if(mode=="world"){
        streetView.innerHTML=worldLocs[locIndex];
        link = worldLocs[locIndex];
        
        
    }else if(mode=="famous"){
        streetView.innerHTML=famousLocs[locIndex];
        link = famousLocs[locIndex];
        
        
    }
    else if(mode=="northamerica"){
        streetView.innerHTML=naLocs[locIndex];
        link = naLocs[locIndex];
            
        
    }
    else if(mode=="southamerica"){
        streetView.innerHTML=saLocs[locIndex];
        link = saLocs[locIndex];
            
        
    }
    else if(mode=="middleeast"){
        streetView.innerHTML=midLocs[locIndex];
        link = midLocs[locIndex];
            
        
    }
    else if(mode=="europe"){
        streetView.innerHTML=euLocs[locIndex];
        link = euLocs[locIndex];
            
        
    }
    else if(mode=="asia"){
        streetView.innerHTML=asLocs[locIndex];
        link = asLocs[locIndex];
            
        
    }
    else if(mode=="australia"){
        streetView.innerHTML=auLocs[locIndex];
        link = auLocs[locIndex];
            
        
    }
    else if(mode=="africa"){
        streetView.innerHTML=afLocs[locIndex];
        link = afLocs[locIndex];
            
        
    }
    let latPos = link.search("!1d");
    let longPos = link.search("!2d");
    let destLat = '';
    let destLong = '';
    for(let i=0;i<7;i++){
        destLat += link[latPos+3+i];
        destLong += link[longPos+3+i];
    }
    document.getElementById('destLat').value = destLat;
    document.getElementById('destLong').value = destLong;
    destination = parseFloat(destLat) + ',' + parseFloat(destLong);
    // console.log('Destination:',destination);
    function countdown(minutes) {
        var seconds = 61;
        var mins = minutes
        function tick() {
            var current_minutes = mins-1
            seconds--;
            timeDis.innerHTML = "<span class='time' style='color: white;'>00" + ":" + (seconds < 10 ? "0" : "") + String(seconds) + "</span>";
            if( seconds > 0 && !stopCounter) {
                myVar = setTimeout(tick, 1000);
            }else if(stopCounter){
                stopCounter = false;
                clearTimeout(myVar);
                setTimeout(() => {
                    nextMap.click();
                }, 1000);  
            }else if(seconds <= 0){
                // console.log('ok its false')
                stopCounter = false;
                clearTimeout(myVar);
                setTimeout(() => {
                    nextMap.click();
                }, 1000);         
            }
        }
        tick();
    }
    countdown(1); 
})

socket.on('score-upd', rooms => {
    playersScore.innerHTML = '<tr><th>Players</th><th>Score</th></tr>';
    for(let i=0; i<rooms.length; i++){
        playersScore.innerHTML+='<tr><td style="color: white;">' + rooms[i][4] + '</td><td style="color: white;">' + rooms[i][5] + '</td></tr>'
    }
})

socket.on('player-left', rooms => {
    playersScore.innerHTML = '<tr><th>Players</th><th>Score</th></tr>';
    for(let i=0; i<rooms.length; i++){
        playersScore.innerHTML+='<tr><td style="color: white;">' + rooms[i][4] + '</td><td style="color: white;">' + rooms[i][5] + '</td></tr>'
    }
    playersList.innerHTML = '';
    for(let i=0; i<rooms.length; i++){
        playersList.innerHTML += "<span><i style='color: green;' class='fas fa-circle'></i> " + rooms[i][4] + "</span><br>";
    }
})

socket.on('winner-disp', rooms => {
    nextMap.style.display = 'none';
    gameScreen.style.display = 'none';
    startScreen.style.display = 'block';
    winnersScreen.style.display = 'block';
    for(let i=0; i<rooms.length; i++){
        for(let j=i+1; j<rooms.length; j++){
            if(rooms[j][5]>rooms[i][5]){
                let temp = rooms[j];
                rooms[j] = rooms[i];    
                rooms[i] = temp;
            }
        }
    }
    // console.log(rooms);
    if(rooms.length>=3){
        winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>2nd</h2><span>'+ rooms[0][4] + '</span></div><div class="col-md-4"><h2>1st</h2><span>'+ rooms[1][4] + '</span></div><div class="col-md-4"><h2>3rd</h2><span>'+ rooms[2][4] + '</span></div></div>';
    }else if(rooms.length==2){
        winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>2nd</h2><span>'+ rooms[0][4] + '</span></div><div class="col-md-4"><h2>1st</h2><span>'+ rooms[1][4] + '</span></div></div>';
    }else if(rooms.length==1){
        winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>1st</h2><span>'+ rooms[0][4] + '</span></div></div>';
    }
    
})

socket.on('all-users-clicked', () => {
    stopCounter = true;
    // console.log('ok its true now', stopCounter)
})