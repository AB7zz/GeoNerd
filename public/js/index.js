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
const playAgain = document.getElementById('playAgain');
const exitGame = document.getElementById('exitGame');

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
const playExitBtn = document.getElementById('playExitBtn');

// Input
const chooseCreateName = document.getElementById('chooseCreateName');
const chooseCreateRoom = document.getElementById('chooseCreateRoom');
const chooseJoinName = document.getElementById('chooseJoinName');
const chooseJoinRoom = document.getElementById('chooseJoinRoom');



let isModeChosen = false;
let stopCount = false;
let mode = '';
let host = '';
let player = '';
let playerId = 0;
let roomId = '';    
let locIndex;
let destination;
let nextCnt = 0;
let round = 0;
const chosenLocs = {};


const loc = ['']


const worldLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1638964938039!6m8!1m7!1sfQtgVh45O5W2I4sya1Lzpg!2m2!1d17.97793544136098!2d102.6260245574379!3f47.93349265286675!4f-8.609671401753843!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485175121!6m8!1m7!1sCAoSLEFGMVFpcE5FaEE3TEV2RzROMlJlRkJLWVF1LW05MWFCbWp1dFNmNjhmSVVx!2m2!1d31.414199!2d27.00780599999996!3f278.0911907616493!4f-14.090972151271899!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485200420!6m8!1m7!1sCAoSLEFGMVFpcE1jd0xBbU5Xb2dldC05dTVsVDNpVWRKM1J3UWhqNnFid0NnZFJk!2m2!1d47.3335256283636!2d59.13815036416053!3f39.805034934991944!4f-27.57345567400084!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485234449!6m8!1m7!1sCAoSLEFGMVFpcE5FeExOZERvRE1uR0lfNWNCSWtTQmpTQlRoM0E5U0d5T1NvblRm!2m2!1d61.48495552497919!2d6.754121817648411!3f70.44646698395478!4f-2.933334837682949!5f2.0200036773138703" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485290208!6m8!1m7!1sCAoSLEFGMVFpcE1obUNQdDhyYzN5d0RhUVdaZ0xlak43azdQTFZJQXZjMnNHS0M0!2m2!1d35.78050933087022!2d-90.70798154414928!3f203.87427206199487!4f-12.818030012036289!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485557329!6m8!1m7!1sCAoSLEFGMVFpcE9Rc3BiTzVfUm42M0l1eXJqaHdDeE9NYkdDR0RjZVdLNGQ4TzBH!2m2!1d-16.71966487324859!2d-71.31520577428005!3f155.18732998863055!4f-10.75050431614713!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485634866!6m8!1m7!1szsb5XsI7nuIqQ5k2XquuAg!2m2!1d53.35261145091351!2d-110.8554815197637!3f266.2917779052468!4f-6.736912627265383!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485658557!6m8!1m7!1syRMVn52g_tAMLdWgnpZ6Hg!2m2!1d54.71785460283225!2d-113.2842670479706!3f13.45009728952914!4f-9.460703515929211!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485703731!6m8!1m7!1sCAoSLEFGMVFpcE1kRi1WSWwwWUFRd3NOU3dpS3dpZWFBbElCejBjRHI2R2xsZEdG!2m2!1d47.486059!2d3.907368!3f215.44661976284732!4f-16.018845767787397!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485788100!6m8!1m7!1sCAoSLEFGMVFpcFBqdVJLRWpwUms3bUo2Z3dhbl9yZXZtaHFnX1AxbVRzUW9zaGg0!2m2!1d52.50441561746677!2d13.33519142073011!3f104.52834252726156!4f-6.578042429805819!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485837836!6m8!1m7!1sCAoSLEFGMVFpcE5vRUNmTzk4bU1JZU5oTV80Si0wR0pSVTdMQnJGU1dCWGtIbTJD!2m2!1d50.12746006586569!2d8.891759257124153!3f299.58335199574304!4f-9.757145928174594!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485867206!6m8!1m7!1sCAoSLEFGMVFpcE9DYjdfaGI0R01zSWNzMUI3Vk5zQ19OQ05CVkE2TnN1UlIybVR6!2m2!1d48.8613085721185!2d2.335389330983162!3f122.0530125857174!4f6.106578264905863!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485905186!6m8!1m7!1sCAoSLEFGMVFpcE9lTU1WZmxjVHFmMllZZTRKQjc2d25mM1JfN2JMMk5YTnplbzNK!2m2!1d41.88933333333333!2d12.49133333333339!3f279.1941554294443!4f-5.951535496124549!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485931993!6m8!1m7!1sCAoSLEFGMVFpcE5ITW4tQlFPb3NPYUxCMjFGSU16eUF2YXNHZk9jcmlKOThBTVpV!2m2!1d42.75992343!2d11.11359459!3f153.0693862791769!4f-8.621457710956903!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637485990776!6m8!1m7!1sCAoSLEFGMVFpcE0zWHFYQU81QU5NY2JGMzhvbThRNXQ3WFdmVnQxWEhjZ3lxa3hr!2m2!1d59.32626024326464!2d18.08212707303337!3f9.026319912837835!4f-10.74746876553968!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638956628101!6m8!1m7!1sCAoSLEFGMVFpcE5uRTBpOC1Xc1FXNnZLMlA1QWNSM19ZTGVxbGN0U19VLXU0YUJK!2m2!1d53.47946952781422!2d-2.245026052600792!3f36.77617403658765!4f-5.772293607608816!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638956850422!6m8!1m7!1sCAoSLEFGMVFpcFBRNDdxTTdtNnNlMzh2Tm5uLVk5aE1oR2Q1R1R6bmswZ2s0S2VP!2m2!1d54.89447174050392!2d-2.938679158774543!3f354.001063549593!4f3.223112137959532!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638956877659!6m8!1m7!1sCAoSLEFGMVFpcE1lZDdUeWdvX3k3T3RZYWVxaDJUTWlTWnFhUXdPV1kxZi0xamV2!2m2!1d53.34442426861359!2d-6.257710314311367!3f102.56712388132499!4f21.197226870755273!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638956921436!6m8!1m7!1sxqt58ITWzELjF9rEEUeD-g!2m2!1d52.84557057587453!2d-8.98472583790085!3f202.34603210940338!4f-7.587801919007177!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638956947033!6m8!1m7!1sCAoSLEFGMVFpcE56RmhYYm9fQmVuTFdZRnNHbzVtTkVaMy12OS1wWGEtc01oWlBF!2m2!1d66.99228131856016!2d-50.650799497962!3f253.6152677243933!4f11.555915756629915!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638956971098!6m8!1m7!1sr5Q-gFh6Ieev29rDMUx4Qw!2m2!1d74.45205827897644!2d-20.86448631134564!3f292.17575886626844!4f-1.2797843734414158!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957012003!6m8!1m7!1sCAoSLEFGMVFpcE1ZYm1peVdVY2JBckVsU3ZqcXhpT1h5VUZVSzZmSTJ0bDVONXFt!2m2!1d63.99724840188394!2d-22.62329270617024!3f225.5652424756432!4f-2.309443460427616!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957067990!6m8!1m7!1sJmjT-u_fka55eq_wWPbnlA!2m2!1d32.77385204218476!2d-96.79610456654709!3f135.6379075380878!4f-9.700452811433195!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957089764!6m8!1m7!1shy6GFa0gbbNcwh5JDMlv1A!2m2!1d32.89330778734708!2d-97.10314117738461!3f292.1299118414593!4f0.10160110265684352!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957121197!6m8!1m7!1sjbSedVRcCcJgM3ZTuzzK_Q!2m2!1d33.19531859019277!2d-98.7410623489089!3f190.0782499058134!4f-7.468897555255225!5f1.743217495586081" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957152494!6m8!1m7!1sySAHld8Rh931OYbUZfBlTg!2m2!1d34.73955820608551!2d-97.21850101651613!3f335.11730503161584!4f-3.143516698917921!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957271861!6m8!1m7!1smCcQA6yEjZDZuO1zvx_eYg!2m2!1d36.16956158043338!2d-115.1449144068608!3f162.0096461385718!4f2.707683428993107!5f1.1904710904031863" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957320455!6m8!1m7!1sHgavrfPXNSOjJIOB1o5ppg!2m2!1d36.12680767483827!2d-115.1769398846202!3f288.9298029960657!4f8.284597776582373!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957360143!6m8!1m7!1sKvoHV6rFIfP1lm3CVvIpEQ!2m2!1d34.05092725935222!2d-118.241598919941!3f332.24133054673024!4f-9.564324672512711!5f0.8999615019672609" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957391023!6m8!1m7!1sRa3ejHQeVYdsHkKZYCvg3w!2m2!1d34.06882357671967!2d-118.3430079933374!3f349.86278466159723!4f-2.758021919467282!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957425942!6m8!1m7!1sCAoSLEFGMVFpcE5UaUhSSXlMR01zTlN5d0FmMjVhbWpZR2F3aGNSME1PRzRZRUFy!2m2!1d33.99315830476581!2d-118.4791660576789!3f166.61413908498335!4f-0.9485591994695!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957477251!6m8!1m7!1s2yuUc5Bl8IRiACoJ0sLatg!2m2!1d33.98748367096224!2d-118.4742151027059!3f188.66561765056377!4f-8.2552112122722!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957547122!6m8!1m7!1sj2YbtA0JEy_IL0qEs0OxIQ!2m2!1d34.03911287021872!2d-118.6569272074315!3f80.5063525425915!4f-10.070150507142102!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957594744!6m8!1m7!1spAJFxXjyVVaqOKVLKsUkRg!2m2!1d56.53946466761204!2d-115.3059401930037!3f185.34652467843858!4f-4.635927384945745!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957702284!6m8!1m7!1sqsoNxKehAOR8-DGNIjsNvA!2m2!1d35.99651786066386!2d-78.90334025459623!3f135.91261067228447!4f-3.562822641702411!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957722572!6m8!1m7!1s8sN09zbDAZgz87WG7NS8sg!2m2!1d35.77857565418299!2d-78.63820281160274!3f88.30931670338295!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957739154!6m8!1m7!1sUqoNCndpYO9ytmgE1uo0Eg!2m2!1d35.38734137923718!2d-77.99142299400023!3f109.56513!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957776459!6m8!1m7!1sLAt404-yK36xyA0cdGqLQg!2m2!1d34.62735862516205!2d-78.60638848379205!3f4.556883810506065!4f-12.704102850797142!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957936683!6m8!1m7!1sO1fay1mXEVfYeUOLk4RmXA!2m2!1d-32.04210332929985!2d-52.12209826357049!3f71.24561342075887!4f-0.7385486414190012!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957959609!6m8!1m7!1sq760P036fWPVYhTxyi1wtg!2m2!1d-30.02406802670938!2d-51.17984519667571!3f181.1479229867352!4f-9.03379847360641!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957981009!6m8!1m7!1s-fjhzxGGLPEId2j6-KGFBg!2m2!1d-29.93423437268255!2d-51.05917511229242!3f272.46708977318656!4f-3.117678447454992!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638957999463!6m8!1m7!1sMpG9MvYwT8xdJEX-7ZowEw!2m2!1d-29.84053935225803!2d-51.160489824382!3f99.82122159368349!4f-19.00558391016955!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958017769!6m8!1m7!1sOtpDwxkjvN-TXUPH3JHQlQ!2m2!1d-29.74797630308916!2d-51.15145671039181!3f345.5198136349983!4f-7.310348755574751!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958040524!6m8!1m7!1sCAoSLEFGMVFpcE9odTk1YUFjSGhFVTBYTlAxdTVuM0I3UkgyZ2U1VkNCZHd2ZG9J!2m2!1d-28.94346082288095!2d-49.47926422832865!3f209.78428130178145!4f-5.210165246332963!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958057944!6m8!1m7!1sV8euWd7RD-jdxoPuJjsATQ!2m2!1d-28.81001604864811!2d-49.23166497255436!3f99.78585812428182!4f-14.597990856538644!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958080932!6m8!1m7!1sO1guCRxVct6BJ8O9VzRzYQ!2m2!1d-12.54327582189747!2d-55.7318332054232!3f306.6646!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958117211!6m8!1m7!1sC3WkcqTdENS_coPTwwx3hw!2m2!1d-1.256665631583234!2d-78.62214446105766!3f83.56441347490822!4f-15.037682971498143!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958183932!6m8!1m7!1sCAoSLEFGMVFpcE55REowWlJOQUpPSU1MZEhLbndrU29BV2pMNGFEQ0dLaGx2YmRH!2m2!1d8.994463079963325!2d-79.51550424483597!3f305.80301004969994!4f2.3082721282711987!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958207860!6m8!1m7!1sCAoSLEFGMVFpcE1nTjBKaDBsbkdIN1Q4NnA5YW1maDViZlN6WU1pZW9KZC1Ub3NV!2m2!1d18.48364378930112!2d-69.92919708777059!3f170.6878537610637!4f-6.766992611983156!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958242416!6m8!1m7!1s98-tWSZWK-K0qFB0Kcj-Xw!2m2!1d53.40868918979159!2d-2.996851721832037!3f151.5419568030985!4f-9.365870220713646!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958258586!6m8!1m7!1sfyeROS8JHHhzvJfxixtvcw!2m2!1d53.42467905896687!2d-3.065693037423725!3f183.2858010149109!4f-0.9258901874072052!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958279466!6m8!1m7!1ssaCkmWqlEi_hQ-xucmFM9w!2m2!1d53.38138462794548!2d-1.469229661662242!3f256.77713544893777!4f-3.688564206233707!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958302340!6m8!1m7!1s-jZn47HAMpov98y0ITtkOQ!2m2!1d52.95505110210343!2d-1.157520937329949!3f299.93230764657915!4f-7.353050346234141!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958339875!6m8!1m7!1sMiJ52b8eNn6-HIIqDdYpWw!2m2!1d52.09311901582483!2d-1.946973636004675!3f166.47564798684655!4f-4.22142295173532!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958379697!6m8!1m7!1s6NUEXRAx-7ph34VKNPnlOw!2m2!1d51.85770361015353!2d-4.314538539655431!3f162.8921588188577!4f-9.193580637729!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958402082!6m8!1m7!1skDTmTMMNU8_aP8CgmjhCbw!2m2!1d55.86345077996878!2d-4.253013661448547!3f190.68051!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958425114!6m8!1m7!1sn1t0znhUwKxAIA9sR43l1A!2m2!1d57.15196646728811!2d-2.103675595598398!3f352.87134902618294!4f2.4405500342918316!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958473653!6m8!1m7!1sCAoSLEFGMVFpcE15MExvY3VfSnBiTGU1cy1BZEpIWHVPdzJabVhfQ3QxQjRjLWlm!2m2!1d62.01383998333!2d-6.779618545927235!3f159.81403371169117!4f2.3417863024189813!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958516718!6m8!1m7!1s1Ur7SAvF59NavsHZJkpxpg!2m2!1d6.128022553088993!2d102.2411083787099!3f98.25023277500992!4f2.5852097087856123!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958578441!6m8!1m7!1syvHdbLegBy2Hw7J4se4Fpg!2m2!1d6.118557095570828!2d100.3660067336968!3f190.7583880083315!4f6.368545149840784!5f0.8493292994643842" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638958611441!6m8!1m7!1sg8VKzLfkE_gHPI-F4WSL6Q!2m2!1d8.447359729303836!2d98.52555217386863!3f220.6351280836696!4f-5.037951709876225!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965138339!6m8!1m7!1sCAoSLEFGMVFpcE5fR2tGWkNzWnhES1hWcnAtZUtzbkprWjhVeWlKOFlyVXM2UWZw!2m2!1d21.0329159504582!2d105.8071346067286!3f98.11504461963364!4f-1.3193469026060285!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965176305!6m8!1m7!1saZ_F-mi2fo_uf3J6xX-8XA!2m2!1d22.35009343129174!2d91.78927840008593!3f84.06445260559124!4f-11.381415758264126!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965195064!6m8!1m7!1sCAoSLEFGMVFpcFBlT2pNLTJ5RHQwY2h1VmhOR2JtNW1MRWZqZWJTVENhRFNEbVhV!2m2!1d23.79540129178066!2d90.41399938440463!3f143.19531335780223!4f5.526212828528301!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965248619!6m8!1m7!1sCAoSLEFGMVFpcE9saVBHcWt3VjNlSS1NdWdjMlN1ckhSUXlxYWJiZ2ZZZE1la01B!2m2!1d22.809183209605!2d86.202778969928!3f80.52992262285849!4f-0.902473977804334!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965275766!6m8!1m7!1sCAoSLEFGMVFpcE5IOVJOMmNRQWs4dHNwVWt6NUVaNzhWVjQ0X0FZN3U5ZlN2cUww!2m2!1d23.56185262997342!2d120.308908795138!3f289.04012054183886!4f18.44809051790199!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965291347!6m8!1m7!1sZ27T1p_JpUeERR0Nib3juA!2m2!1d22.62963744470371!2d120.3045610733005!3f18.452160172946947!4f5.099407496436783!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965427410!6m8!1m7!1sf7rO2_ScvLfrpOAn7m4K0w!2m2!1d38.67550902607017!2d39.22172234190459!3f343.27302571175903!4f5.414472982003161!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965450578!6m8!1m7!1sCAoSLEFGMVFpcE9XYUozeUtaM05kU0dZS2lUR1lCNEJsWTI2NEdRX2VoTGtBc2pz!2m2!1d40.18546706310974!2d44.51502756245867!3f11.281982117432051!4f9.866821844433701!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965469057!6m8!1m7!1sCAoSLEFGMVFpcE9uX1g3eER5eWpKUUZwR1BIZ0RVbnVfQVJpZEdWcjQ3NmpSVWpy!2m2!1d41.70422681436744!2d44.80792258490848!3f340.1479763982941!4f-2.092789370943379!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965491063!6m8!1m7!1sCAoSLEFGMVFpcFBuTXVtUWN3NTRFZWZUZGs4djhHUTFZcGxfV0xtdDZhZ2I0MW1w!2m2!1d40.39636246280848!2d49.83963467847485!3f152.88173424068003!4f5.624122764680024!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638965514382!6m8!1m7!1sbDKj0oLEacXWrem0GZ8ZAg!2m2!1d45.04108100181288!2d38.97812168840313!3f103.12575!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];

























const famousLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637839636598!6m8!1m7!1si0BnBFVNYD0u-LjaPfT_Ig!2m2!1d27.17371271115795!2d78.04199633586421!3f7.479905994001285!4f12.470959617267297!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637839695042!6m8!1m7!1swROd1Fp1I5q7D0ApCxDCaw!2m2!1d28.52504010829838!2d77.18539619260048!3f172.07051949563655!4f21.774915717693787!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637839796792!6m8!1m7!1sRX3hFZkLw25TpLab3IDaFg!2m2!1d48.85717912330423!2d2.296643061618369!3f317.047829226944!4f31.33394146168908!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637839880681!6m8!1m7!1szzWKU9YJQR8ikoxcT1oGOA!2m2!1d25.1973409443283!2d55.27337521322483!3f89.84176146426343!4f56.28306294299077!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638966955257!6m8!1m7!1sCAoSLEFGMVFpcFB1VTB1TGxKc2pQaWdLT05GaGxGNFBLWDV3Um15dXR5MDl2YmRp!2m2!1d40.431997711109!2d116.57041900386!3f9.724846609477307!4f8.191789121721172!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638966988712!6m8!1m7!1sCAoSLEFGMVFpcE9aMXhsWllNUEVmZFBEQlVVVUR2MTcxTG4tOTVXVWtWVjNOOWNv!2m2!1d55.7520233!2d37.6174994!3f27.94635306378244!4f24.259189256139834!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967045302!6m8!1m7!1sCAoSLEFGMVFpcE45eGw1amRVVHpsclhlQnJwUmVVZk9MemFnYnJrdEZLSWF3Sk1u!2m2!1d43.7225683!2d10.3963587!3f19.401663843854102!4f20.97772297397023!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967072884!6m8!1m7!1sF%3A-AGQ93oPZZVE%2FXk87a4S29aI%2FAAAAAAABIVM%2FxlVwtno9BWQnPMfPsIlznOT5KtK5l1s1gCLIBGAYYCw!2m2!1d29.97710789775853!2d31.1355612253416!3f284.55587712897426!4f9.049655547484292!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967103844!6m8!1m7!1sCAoSLEFGMVFpcE9lOVdQQVhWbXhWVy00S1hUXzFkOVZwVTM4WTh3dDdZbFJncEVa!2m2!1d-33.85624289299529!2d151.212551034987!3f131.88899357719077!4f5.623567833816935!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967135640!6m8!1m7!1sCAoSLEFGMVFpcE0wUkIyaG50cGdlbmlUR2xsM2NXWnFTTUtTRC1xcWlaMUw1ei04!2m2!1d40.7467468!2d-74.0528219!3f340.7743880228676!4f20.976459946144075!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967232166!6m8!1m7!1sCAoSLEFGMVFpcFBxZFY3V1FGOXA5VHJQVXhkS2ExV25yaUlJWEg1OFpmcklGMmZx!2m2!1d-13.1631507!2d-72.5449549!3f25.485356437244334!4f-6.320380000020592!5f1.0710524866873028" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967268842!6m8!1m7!1sCAoSLEFGMVFpcE1yd1dlaEEyR0NDc0xzcE14MGtvODZEUGdfQklmZlkyVDlpOXJ0!2m2!1d51.500499!2d-0.1265714!3f94.114196183285!4f17.749868943778395!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967326118!6m8!1m7!1sCAoSLEFGMVFpcE5vbXUtVnhrQjJEOGdVeTlTazV5c3B6emxuYzlkTDhyWll6WjZN!2m2!1d41.8893726!2d12.4924378!3f273.72588518141504!4f2.4556009308775373!5f1.0376567249488577" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967360220!6m8!1m7!1sCAoSLEFGMVFpcE0zeUpNM3oyd0l3WmhHTHhjb3hrQzQxRm91elVsTnlXTzItb3pL!2m2!1d40.7484405!2d-73.98566439999999!3f9.690463090807407!4f20.242589501530972!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967383060!6m8!1m7!1sCAoSLEFGMVFpcE5zbHBwMnBqMGU3d2VVSkVDSmtjTWpkWWJWUEZpMlhtdlRuaW9J!2m2!1d34.1307216!2d-118.3188321!3f330.7892302129588!4f14.102210222336055!5f1.8582937264986592" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967410156!6m8!1m7!1sCAoSLEFGMVFpcFA1RUI5V2JMUlhZVVUyX0psMjlyMjMwaFdzQ1lYcVRMdmRMXzh5!2m2!1d37.798085!2d-122.466538!3f328.9319602758397!4f-9.88887028263946!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967468056!6m8!1m7!1sCAoSLEFGMVFpcE5RMHZnVjRIRExmU2hqbVMyQXRhU3NzV2JRbVB2MWFKdzN5T2VF!2m2!1d35.6582838!2d139.7457756!3f21.728330257052818!4f52.89035300688457!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967493119!6m8!1m7!1sCAoSLEFGMVFpcE9BVTJnbEZFZTZWcVVDR2lNVFpKTDlSRkdXdmozXzFLQTVELXAy!2m2!1d51.503324!2d-0.119543!3f325.81974975448145!4f31.404242986846796!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967544780!6m8!1m7!1sCAoSLEFGMVFpcE9EUGJUQzdLWFZfd2ZoU0RqUDk0Vzd1ZFpRV01BeTh3cWhxSlVR!2m2!1d41.403862!2d2.1751194!3f331.58507217880253!4f28.59518249062515!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967572484!6m8!1m7!1sCAoSLEFGMVFpcE5CTFBLa1NpbFI0b01LTmMzMlhOclM5cGZJbGNWbVRCdUVuY0ly!2m2!1d41.3908464!2d2.1809115!3f308.6380258025245!4f18.299399567800123!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967637668!6m8!1m7!1sCAoSLEFGMVFpcE11dE92bXlUcXdmSzVzdTNfUktSekJGaklicHIxRkk2NEtFS25a!2m2!1d51.17888199999999!2d-1.826215!3f128.72854818708473!4f11.847293148864935!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967858895!6m8!1m7!1sF%3A-DZ93zEymclc%2FXdy981si2LI%2FAAAAAAAA07Y%2FiLXmu5YoKdQtdkINnrYLFD3f_IlDFBNVACLIBGAYYCw!2m2!1d39.914668!2d116.3909215!3f73.80680492410985!4f10.782552767436286!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967894385!6m8!1m7!1sLlNnPGPlBMC1g_G-ACfeAg!2m2!1d27.84486123642233!2d86.74877105393381!3f110.76802046059568!4f-2.830452301983925!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967939309!6m8!1m7!1sCAoSLEFGMVFpcE5TenpJZzBLNV96VHZ5Y3RVb0g2YmxvLWpfWEVGWU93N2xYZ1dF!2m2!1d25.1413165!2d55.1854524!3f263.0384434023134!4f15.411433376130873!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638967967614!6m8!1m7!1sCAoSLEFGMVFpcFAyZnhpdG0yeC1yVmFIOEJEc3U3UFIybVpwLVE3eXo0RVlTcm5l!2m2!1d37.97179430966114!2d23.72705195099115!3f227.27050540570642!4f17.80097349878089!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968011887!6m8!1m7!1sCAoSLEFGMVFpcE0yS05DZk5TRlZiYnNUS0x4akVaTWNmaVkxYllqaVdYcUEydGwy!2m2!1d40.7564447!2d-73.9862124!3f10.245753055240527!4f4.400662714162948!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968407610!6m8!1m7!1sCAoSLEFGMVFpcE92aGJsdlFvY2F3MXp2U2t2NE5PaUdUUFk2MkhHbkQ2YWx4SzhM!2m2!1d38.8985629!2d-77.0365386!3f188.90667880335516!4f3.5225074046155243!5f0.6636740406242068" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968546871!6m8!1m7!1sCAoSLEFGMVFpcE5Rb3Y3UGI2a0tTSHVxWll5Zk9QX3RMMVNLd0pVQ0gzQk1HYWJt!2m2!1d50.84499470000001!2d4.349977099999999!3f80.32959654716257!4f17.08996657319983!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968639685!6m8!1m7!1s8vTa8E7DXkyccgHaKlMS5g!2m2!1d51.50143958069878!2d-0.1403816027814974!3f272.0967545542894!4f10.37914909873632!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968685837!6m8!1m7!1sCAoSLEFGMVFpcE9ERzNRU0cxNFhBUWIxdnRMMHUtdWt0c1hiSmxYbmFwb1dTRTVB!2m2!1d48.8148602!2d2.1056051!3f267.6505613293278!4f8.575643012847209!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968726591!6m8!1m7!1sCAoSLEFGMVFpcE96R2E2RThpdmJYT1JEZzl2Y25XSnZvYVEwdEZKV3M3dEVyZnNF!2m2!1d-22.9518582!2d-43.2100974!3f287.03223449583203!4f20.712891868076326!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968758525!6m8!1m7!1slKdx6VY1EebnsM2JbyBGpQ!2m2!1d43.6431431833401!2d-79.38850368036513!3f124.71801573194794!4f48.646269113018434!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968799108!6m8!1m7!1sCAoSLEFGMVFpcE1fMTlUSXdmbF9lMk9uQnR5S19LNDBjcjBIZjRRUEJuZWVrcGpi!2m2!1d35.20425441304415!2d-111.6475596625892!3f344.3415074730171!4f-9.598958131493859!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968890092!6m8!1m7!1sCAoSLEFGMVFpcFA1UlBBazlNR2dGcHcwSnNvNmtQNjRBbmdjQ2ZzSmdoRldvUGpX!2m2!1d51.507937!2d-0.0761884!3f9.633536856522085!4f18.745521000806164!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968923778!6m8!1m7!1sCAoSLEFGMVFpcE1lX3FSbkY3TFlFQWVpQzZLbjR0a3g5WVBjUms2MXkyemRYTVRT!2m2!1d45.4377814!2d12.335837!3f234.9430721105223!4f-2.545222586832921!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638968956812!6m8!1m7!1sCAoSLEFGMVFpcE82dk5ILXE4dUlSUFgwNVJRR0plZjNVUW5EcTRIRkpDcTltRDdD!2m2!1d45.4389839!2d10.993195!3f91.04005350232204!4f17.628210694178676!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969005716!6m8!1m7!1sCAoSLEFGMVFpcE1uN0c0TUV2MjNVTUxHMWlhZVViTDdvbG5PckEwVXJTX2MwWVcx!2m2!1d51.5045!2d-0.0865!3f12.866529409502466!4f13.404853552947017!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969036076!6m8!1m7!1sCAoSLEFGMVFpcE1UTkpoWFZPRUljZ3RqUGNjWFgxVHVCOGQ5LUl6dTBpWXh2N1ZQ!2m2!1d52.5162746!2d13.3777041!3f357.2412332345916!4f20.257230000000007!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969077348!6m8!1m7!1sCAoSLEFGMVFpcFByVmxKcWJEaW9fdmJnZ2pTOGx1SV9qcDFGbDhsNFpKM0Z6Vm4t!2m2!1d20.6829631!2d-88.5678736!3f272.13527732418856!4f16.28062290331212!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969285318!6m8!1m7!1sCAoSLEFGMVFpcE15R0d0S2xhVmFtLXcxQ29FbmJCZGpJWW1nbnVrT0E4MlNjMDJU!2m2!1d30.585164!2d36.238414!3f11.302662445725787!4f-16.927782192547994!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969307646!6m8!1m7!1sCAoSK0FGMVFpcFBRUW9hdWdPUU5vNmYtY3FFVjZtUXJGS1NMUjZWQlNmS1NuVGc.!2m2!1d13.4124693!2d103.8669857!3f333.70270540968573!4f10.2196134448765!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969336398!6m8!1m7!1sCAoSLEFGMVFpcE01RHFYdDZzcTFidVNPQ3dkX3dSMGNFd1lzemY3WWNJcEE0UGJi!2m2!1d31.2396889!2d121.4997553!3f303.07911788776505!4f17.509539233219314!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969361807!6m8!1m7!1sCAoSLEFGMVFpcE9fOTBuVHNPMmtKWFVOYXF5aEFEYVg2dFpuY2o0dmh0cWQ4RlNl!2m2!1d55.679776!2d12.5913041!3f343.9703949107543!4f1.2349817997686756!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969414820!6m8!1m7!1sCAoSLEFGMVFpcE5uSlJlUlVuMTd4bnpFemJxeHhZN1pLa2h6Y1lFaEtRRjlFSGx0!2m2!1d-33.85701372569476!2d151.2101897826093!3f21.343945626485834!4f11.841153614022303!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969490099!6m8!1m7!1sCAoSLEFGMVFpcE5hOEVvYTRJZGJPbC1KUFZXaEpBcXVEaVhQc09aZmJRZjBvdVV3!2m2!1d21.4230833!2d39.8264378!3f199.04993577464433!4f14.424364416021035!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969528280!6m8!1m7!1sCAoSLEFGMVFpcFBGTFpIbVZaV0VkbU5ickstZTNVVDVKR0o3Mll4VU9JSjEyVm51!2m2!1d45.4339333!2d12.3433704!3f25.527527500766098!4f-11.947707858821403!5f0.8378705584345322" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969560886!6m8!1m7!1sCAoSLEFGMVFpcE5NT2pHWWNnZFU5WGRLNmhkVkxYUF80dWlnandRTlRRZ0xIOVQ0!2m2!1d38.624691!2d-90.1847763!3f33.02221627391529!4f19.125997843039357!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969584478!6m8!1m7!1sCAoSLEFGMVFpcFB4VV9scXl6aXB1TlZJN1FsMmNUU19IMVR3S1NtaGRjSkNnejl1!2m2!1d52.5190608!2d13.401078!3f3.38667493222448!4f17.174224490386152!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638969659449!6m8!1m7!1sCAoSLEFGMVFpcE9vS194ZDdaRW9iblF1VzhndGpXNHlEdF9yaF9CQXJpNEt5NW04!2m2!1d33.810485!2d-117.918989!3f353.00495165546783!4f-0.0187909931984791!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];
























const naLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637832575976!6m8!1m7!1sCAoSLEFGMVFpcE40R0tkTUZONGRyZlk4OEZ3V3VLa0VfZXBZY19iZFlZRHk1Q1pT!2m2!1d40.70482690001091!2d-73.99017167999517!3f275.40866443346977!4f-6.056322507423857!5f0.9717701081263649" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832605884!6m8!1m7!1sCAoSLEFGMVFpcE9fMnRzbzMzV0tOYWM1NjB5Wk45NHVzWnJ3QmlxU01RNEY1Wm11!2m2!1d39.95222106169634!2d-75.16250399944833!3f333.8380933087782!4f-8.86176007350916!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832654589!6m8!1m7!1sEB0XepK2Yuewsct2Pf-Ucw!2m2!1d38.90309847893553!2d-77.03648777966912!3f356.34311574935776!4f-8.406228419571008!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832721393!6m8!1m7!1spi2QPgUuCkG-pkOEH6AwOA!2m2!1d39.85057196346999!2d-86.14575244984947!3f170.82780642388866!4f-10.210105252982842!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832762078!6m8!1m7!1sCAoSLEFGMVFpcFBNM082V2xfQjN3UDVkRWN3SHVNWW05U0xra1RGNDc2T3pMOEhl!2m2!1d50.4848722!2d-104.3405833!3f98.01984670673592!4f-14.498253305468296!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832784061!6m8!1m7!1sq1T6fMd9da56H4N_uzckjg!2m2!1d47.07117389737355!2d-109.4111727670959!3f175.63674120269013!4f-12.667266928590251!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832845644!6m8!1m7!1sCAoSLEFGMVFpcE5NVDhlU1kyQmE4ZzhGd0dGeEdFaVBQMEN2X2x4V3FDeFJJVHB4!2m2!1d22.14930961492133!2d-100.9774823800279!3f174.7528230734282!4f-2.6702561609722864!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];














const saLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637832890491!6m8!1m7!1sXR3A33ccIkaMIk1fizRcbQ!2m2!1d-10.93958131454156!2d-69.56720729946694!3f273.39125935554404!4f-7.6904457997953415!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834007525!6m8!1m7!1szst0k2YqdIsQVnW-6KgwIw!2m2!1d-35.65874433402659!2d-63.7563087588347!3f336.1423940881988!4f-6.736266959869454!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834045608!6m8!1m7!1sCAoSLEFGMVFpcE5scHpxbE1tUDlycGp1NEFmS2kxaG8wRjdUTW1jU2pFT1Eyem5L!2m2!1d-34.58679006260881!2d-58.39193583484739!3f149.5038903878047!4f-3.6053035991015747!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834085998!6m8!1m7!1sr-hhyxb5XbUPvtkHxOmKFA!2m2!1d-35.11786355780791!2d-65.39356863396071!3f265.7810383584665!4f1.1568529796321343!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834122765!6m8!1m7!1s-nmoYe1T9OppyXMbalU_Dg!2m2!1d-33.46721089890352!2d-70.62649380880686!3f182.5164205955976!4f-8.174291458863024!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834195435!6m8!1m7!1sj18C1pLrEigxOtjh04eFaQ!2m2!1d-26.64485037693573!2d-69.94646389508843!3f8.843835243223737!4f-12.073848360522277!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834232350!6m8!1m7!1sIU9wYbMKL1JFoSbW-KB1rw!2m2!1d-20.38337250852792!2d-63.40369890909822!3f8.571334131981835!4f-8.1464724082673!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];









const auLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637834271127!6m8!1m7!1s6MY5YerrlTzMSelfaLQCpw!2m2!1d-26.27607875062295!2d133.1880118464087!3f87.69052472704719!4f-10.588022962317751!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834303604!6m8!1m7!1sCAoSLEFGMVFpcE9ZZG5HVl9xS1A1RFpCUmdvTFJ4dFhlcVNVZi02YWRHd0RvVER2!2m2!1d-31.9507227654221!2d115.8581394329667!3f218.45888122890688!4f17.26842887652353!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834332725!6m8!1m7!1sCog513sN70rlQSOml_j4TA!2m2!1d-26.24792049161332!2d114.4029159229895!3f345.01027168655656!4f-20.328558922805357!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834373192!6m8!1m7!1sjhcLOdk1-gdYOlzm3uQfVA!2m2!1d-25.50531332454217!2d113.5106660516342!3f44.693650345875284!4f-9.469513426836187!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834404256!6m8!1m7!1sCAoSLEFGMVFpcE5VVldydFl3Vmt4djhZTGEweHFWcGcwcE41Z0FQMW9UQmxDc201!2m2!1d-27.4722167!2d153.0396861!3f313.7550882122487!4f8.32502223286653!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834425430!6m8!1m7!1s0kr1e4GsfdnCvNoSTpAEFQ!2m2!1d-27.52660181040405!2d153.0956676303504!3f204.8571992282422!4f-11.379452356068981!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834445200!6m8!1m7!1so9GU7k0lwia1j1Je3Y6z3Q!2m2!1d-27.30222138968247!2d152.9734822638954!3f122.70799896785809!4f-8.062929179135295!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834464543!6m8!1m7!1sFiaLqo1QFSpV__m4eiOAXA!2m2!1d-26.89418902031042!2d152.2895206554807!3f99.59847148491171!4f-18.95262776434292!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834498379!6m8!1m7!1s9YlTyBGu9FnGuz5IDdLgMg!2m2!1d-25.97403461984053!2d153.0732320749023!3f307.36877944211767!4f-21.748025640283913!5f0.7752103442288524" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637834519382!6m8!1m7!1s9D_jmjWyj-a2qimHZvpkLg!2m2!1d-25.52937031916751!2d152.6981789376062!3f144.00452190433995!4f-3.623744673606211!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];











const midLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637766546747!6m8!1m7!1sCAoSLEFGMVFpcFBsMWZaZ2Z2aTh5dHFSV016LUNwMTZHWnh1VG1iN3Axd2toTmRZ!2m2!1d26.37280387731565!2d50.20053812525813!3f199.70012546041275!4f-1.6182314593301754!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766583870!6m8!1m7!1sCAoSLEFGMVFpcE1hN0VKcUpQMFQyOUtvNVQ3cXVTczBxOHdNcjhEQVFDYXkxN0ZI!2m2!1d25.37811365846945!2d49.58889037896495!3f175.03765529937658!4f-1.7233271668865484!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637766611562!6m8!1m7!1sCAoSLEFGMVFpcE15Y2pBbUVodzI2cWN1dW5VVE9tcHdYTGxWS2dPWkZtdHBlS1c3!2m2!1d26.75843840184502!2d49.86412111041801!3f153.3078404178569!4f-19.599816626932522!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766631176!6m8!1m7!1sCAoSLEFGMVFpcE1YWDVCa0o5NlBvOVNHXy12VjlKQ3ZUazZzNmlONHkzTjctWmpL!2m2!1d26.22951698275732!2d50.51164817808993!3f283.42659935660834!4f5.29647628117398!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766657240!6m8!1m7!1sCAoSLEFGMVFpcE9KN1YtN2FvWHZuQnJ3TjNLUUQ4cE5aR3A4QVZVY1R3cDdSRlBp!2m2!1d25.46085613207438!2d50.93830245684913!3f131.57570474185857!4f-13.276571841111945!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766704895!6m8!1m7!1sCAoSLEFGMVFpcE94aE9Cazh4UUUyMWQ1d0VGU1lVQ0xmdExMcDNxRk9QMmo4WXl6!2m2!1d25.26790373802225!2d51.54898146932145!3f157.4844463619166!4f-10.962266361446467!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766775685!6m8!1m7!1sCAoSLEFGMVFpcE11R2Fqa1dUOXRMcnJkTFRjQzJVSllRRzNLU2w2NE1rSjhjcm53!2m2!1d25.25643330171658!2d51.52379497414881!3f320.30462228057274!4f5.502938596850456!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766849331!6m8!1m7!1s8fcioXpatFnoKuw5ecAx0A!2m2!1d25.1424088641492!2d55.20637766576499!3f59.67916238280179!4f-21.565274686368184!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766924304!6m8!1m7!1sffoIV_dyMhnprWILMGSlHw!2m2!1d25.13122035413065!2d55.11582469781331!3f318.15599446160195!4f-10.704236250884804!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637766981891!6m8!1m7!1s_8vVEAEjkeWILB7N4A5WwQ!2m2!1d25.20848417509764!2d55.27308933474806!3f34.62009402865255!4f17.592288851802834!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767006390!6m8!1m7!1s8CCC9CYd6y44c4u13dUhGA!2m2!1d25.84093402211047!2d56.0003778007377!3f231.8388290967671!4f-11.322970100048721!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767111101!6m8!1m7!1sCAoSLEFGMVFpcE1SWUgyM1A4VVAyWXlYOThRWGdHT0pfUEM1UkFiNmR1QnQxNmpP!2m2!1d23.62798847128645!2d58.27118728463382!3f62.09117364070332!4f4.582767229085974!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767128340!6m8!1m7!1sCAoSLEFGMVFpcE9xYTBfM2k0ZEh6TUw0QW9YdGRGeGQyUnVxRkoxNUIyY1FUdDUw!2m2!1d23.66055488718278!2d58.17222209233972!3f54.443258110177695!4f-11.67400542445344!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637767211718!6m8!1m7!1sCAoSLEFGMVFpcE1oamtBYmhMOV80eVJQQVRiMDlBY3BOZHYxZ0l6RU1KekFjTlVy!2m2!1d34.5505717!2d38.2687133!3f20.47834874957465!4f-11.521653357966414!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];












const euLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637755105548!6m8!1m7!1sDr9azfhx_QYT49FoJhJWgQ!2m2!1d42.60415809347631!2d-6.808044018693965!3f234.82383958941068!4f-17.653029445623517!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755141691!6m8!1m7!1sCAoSLEFGMVFpcE9vbVRxekRiNG9tT1A4bmlVZHprdGNhRHR1QnlpVmhRYkdVRVhS!2m2!1d38.69741695826331!2d-9.20588381588459!3f97.01600368413021!4f-9.118598333717173!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755165177!6m8!1m7!1sCAoSLEFGMVFpcE1GNjRNZ2dGdDdaQy1zVGoxcTZoay0xakppVW1PcGhjU0xLTVhy!2m2!1d40.2023613784016!2d-8.433658077903587!3f168.3152293419058!4f-17.603778776819652!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755205116!6m8!1m7!1sCAoSLEFGMVFpcE42RDdtUGExaXZyaFFLZGh2dzVDOHo5Z2V4aHc1TGVkLUFFX2Z3!2m2!1d38.79312189707685!2d-9.388549625873566!3f42.07226107119251!4f-27.91430844559911!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755228288!6m8!1m7!1sCAoSLEFGMVFpcFBrMGdPN3RabzhjMVYtVzY2YjZwdF9xTl9fcVZPcEpIX2E2ZkRY!2m2!1d41.14247980746057!2d-8.61207766185214!3f342.6511155176127!4f-27.024210185032317!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755252149!6m8!1m7!1sCAoSLEFGMVFpcFBCQkxlbUoyN2t1UU5tRGpkQkptQXkxUllHSTA1LXhObkpKWWdk!2m2!1d40.41748469494325!2d-3.714404500667513!3f119.47916076330796!4f4.055420763909339!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755279493!6m8!1m7!1sCAoSLEFGMVFpcE80dHhBTzh5eEZuMWRlYVJ5UmJVY1VMYnh4a2J0NDFqa1RPYTRx!2m2!1d39.47905539432694!2d-0.3761323036577551!3f268.44278243011047!4f-15.409535594557468!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755314418!6m8!1m7!1sCAoSLEFGMVFpcE5ILWt6OU5GNWhFNzNZTFVpanBkMjB1VU5VMFltNFVpYjhXdkl3!2m2!1d37.37793346465958!2d-5.987707077058383!3f312.4809512963298!4f-14.266954613752333!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755363078!6m8!1m7!1spfQwfPqt4GFXopLoq8GwEA!2m2!1d39.75379574011438!2d-3.160502084456325!3f230.64816753902136!4f0.24588980886078105!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637755390929!6m8!1m7!1sCAoSLEFGMVFpcE4tN3RBemFIY1VBRkxuY2dsZW9ZNUdhcVd1TlBfVVBzczNoMTcz!2m2!1d52.39969374771587!2d13.04837178909295!3f4.877416882397995!4f17.361263381114256!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763147129!6m8!1m7!1sCAoSLEFGMVFpcE5XYkNDbUR2a2Q1UlhYcWdYSjNFenVlcmpUeHFkb3gtZGtaWVUz!2m2!1d49.46119501318083!2d8.985217809677124!3f172.68914421741246!4f-13.917990317100163!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763182298!6m8!1m7!1sCAoSK0FGMVFpcFBVME84bV81UnVrcGR3bERKN1BwdnJvYTVlWjQ2Q0dpZDljQXM.!2m2!1d49.52149239905423!2d8.52445769760294!3f23.389529925147826!4f5.5808482567434226!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763229859!6m8!1m7!1sjEReqzcO5MG0B-baxdEg3g!2m2!1d50.84352514359861!2d4.354923531074831!3f51.15201423699256!4f-7.611675625613628!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763253417!6m8!1m7!1soyjJ6pqCqamV2ALx4z4cMA!2m2!1d50.89228060383997!2d4.329454573104063!3f46.780754486836!4f-33.699622507555716!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763272090!6m8!1m7!1s6yKE8G63pxooZuvoWd01Gg!2m2!1d50.88682960579505!2d4.423199857840319!3f202.62213!4f0!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763310112!6m8!1m7!1sZSGTsTEvr5X-UVWcpq8I_Q!2m2!1d50.9696551049902!2d4.435398934639928!3f235.20732913696563!4f-8.119403964587832!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763352311!6m8!1m7!1svb7xO8ebPLvirkOgDhzvDA!2m2!1d52.36223831409466!2d4.887190980662381!3f15.937186096678865!4f-29.435366089738665!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763374822!6m8!1m7!1s5-BcoWo5IQwqy3Pk6W7KkQ!2m2!1d52.37304160342561!2d4.901986257705474!3f318.84854963018483!4f-21.819275567915014!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763418067!6m8!1m7!1sCAoSLEFGMVFpcFB6dG9QN2tPb0dDY1YyVnkwWFpGLWNlX0NaNXJ6TVM0R3pCTWR0!2m2!1d52.36670448753176!2d4.892976992108515!3f226.83952085018444!4f-9.481255380671357!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763437337!6m8!1m7!1s1LO8_a317oQOf8-cPH-o6w!2m2!1d52.40515945540756!2d4.807628421337417!3f86.7902291423377!4f-12.265723148333223!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];













const asLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1637763486047!6m8!1m7!1sCAoSLEFGMVFpcE1qRXR4a1EwYUtHMWJVZXRkSlc3SFF1ck81YnJIbnlkeTJNR19y!2m2!1d16.2474727!2d80.4328468!3f285.8309540177902!4f3.6481562778518537!5f0.8048898943586006" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763562846!6m8!1m7!1sCAoSLEFGMVFpcFBtYnFBUDRwUURfWmxyUmhYUWRxUkpYd1B5VnpscHQ0aXI2dEIw!2m2!1d19.27356891617881!2d72.96037872065813!3f83.89440256792737!4f-33.54458798607312!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763601348!6m8!1m7!1sCAoSLEFGMVFpcFBqbmpCZnhjVGVlU0J1TEx6VkhKbVRXTmJLU2lhZENQQWQwYk4w!2m2!1d21.7814795!2d70.1241553!3f274.67052648199683!4f-7.1038503860283555!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637763630654!6m8!1m7!1sCAoSLEFGMVFpcE5oR09nQktLTHJNV1BqbV96OUhyeG1XSmNjdFJlMS1yU2NrRlQ1!2m2!1d28.1968861!2d73.7819748!3f211.88864253482214!4f-10.888978239627448!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>', '<iframe src="https://www.google.com/maps/embed?pb=!4v1637766485423!6m8!1m7!1sCAoSLEFGMVFpcE0wRGVYT3Y3bDE4V1E0V2p3SENCSzVjZnpKbjdKMEY4M0s0dFJm!2m2!1d10.7462256!2d76.6712006!3f183.60654841439413!4f-11.816463906544428!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832223784!6m8!1m7!1sqpegKn6ZyXkh-TzfVSBpWw!2m2!1d3.111594830225445!2d101.6500598572299!3f88.9767209978281!4f-4.181583953445966!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832247113!6m8!1m7!1s_9yZw3TEybJQBvN4CC4Ciw!2m2!1d3.196821998558784!2d101.681012791155!3f103.67647970661024!4f-1.4110509490646592!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832274275!6m8!1m7!1sruABaytTqJfsSBGg1i_TWA!2m2!1d3.011220742269916!2d101.4560257259276!3f46.35631137711259!4f1.060603570011864!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832319193!6m8!1m7!1sOdPNFTCF6WEi3mFp5SI1lA!2m2!1d3.236895276270819!2d101.6766188510498!3f338.4845542876269!4f-18.07845085786616!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832344132!6m8!1m7!1sCAoSLEFGMVFpcE85SW54QXRTM1JmT1lCaU1nZTdsQndpSGJCVzZFcDkwT2NkVFUx!2m2!1d1.28479917!2d103.85880231!3f261.0513061051303!4f-12.24536722059446!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832388634!6m8!1m7!1skiP5f2WuJ0rSMm8IAZM8Qg!2m2!1d1.336245634130267!2d103.7467895280482!3f249.02174878940073!4f-25.32096621585019!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832423484!6m8!1m7!1sk7VjBo0CSPTeduG5c96ODg!2m2!1d1.326824010569114!2d103.9185028735887!3f170.79968820015395!4f-13.605224302287226!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832473831!6m8!1m7!1sl15m0GwBpg6MjElS-B45hQ!2m2!1d3.764271067744127!2d103.217352758581!3f294.6673691002639!4f-11.609731331697631!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1637832510019!6m8!1m7!1sYMhnlnU1lpxgP794iQdFVQ!2m2!1d13.80081230467736!2d100.5356188426214!3f280.4680415405998!4f-6.094101153967344!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];





const afLocs = ['<iframe src="https://www.google.com/maps/embed?pb=!4v1638970474989!6m8!1m7!1sXgLEfvJGg3kiEL0VYG5yPA!2m2!1d-33.92398285542964!2d18.4212843655564!3f346.27230667504426!4f-8.97724538593323!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970508145!6m8!1m7!1sql9zpGr0mhurBUzV5X-DdQ!2m2!1d-33.81303705521114!2d18.47700173250375!3f308.4692720931664!4f-0.48488108164382027!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970533230!6m8!1m7!1shUOXO690DB6nm_aynOL2qw!2m2!1d-33.57462936654147!2d18.49575991686487!3f82.25908834714679!4f-11.141272191626499!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970562280!6m8!1m7!1sAcl6fmIivSFmqMjSH2y3hg!2m2!1d-26.48852094043705!2d31.37866412245646!3f350.4122110397495!4f-5.73977739227297!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970734981!6m8!1m7!1sdLqRPEkTJ6hmoD1NxC-cBw!2m2!1d-1.186153571005233!2d36.89111924084855!3f293.1350451659508!4f-9.709300731290256!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970759756!6m8!1m7!1sCAoSLEFGMVFpcE9QbVpsWjBIN25xRDQ3QmU5Z3ZwbTF6X252V0JXaThLN2hNdXgt!2m2!1d-1.247318930626077!2d36.87084591638492!3f117.06183108757699!4f11.949309537146405!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970874419!6m8!1m7!1szJY482FCRl7RnYlI57onOw!2m2!1d14.72981904477699!2d-17.31648281267237!3f271.1489174924111!4f-0.3618454788267087!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970896156!6m8!1m7!1sD2DCsQUYVp7RrdJmB_PL7w!2m2!1d14.74481697422851!2d-17.51068753338312!3f42.01123531822776!4f7.260700621961206!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638970942189!6m8!1m7!1sTCHZchkoM8y8wX5wXzYMpg!2m2!1d15.99403868369749!2d-13.66170468795654!3f279.3321067823864!4f-11.483312721557581!5f0.7640569575811268" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971000270!6m8!1m7!1sCAoSLEFGMVFpcFBLSi1CQzNlMXVkM3ptU1VESU5acFcwQkVHRGVWSEpUVHJwSWw5!2m2!1d30.02893912968509!2d31.25935737321463!3f158.0473039595359!4f6.073861913525576!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971052067!6m8!1m7!1sCAoSLEFGMVFpcFBkT1BSSTV1ZHpQcGpzdWtFNlAzQWFjTFp2TWRjQkljTzhxcXA5!2m2!1d29.98599697081514!2d31.20907147380993!3f241.83349845371555!4f-12.942399725428004!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971123289!6m8!1m7!1sCAoSLEFGMVFpcE1BY09fQVlxQV9Sd2lCeVVtcm5obE5RRmh2cGQzUnRjSGhFaDFa!2m2!1d29.89096538208511!2d31.22065073840267!3f311.45037186441607!4f-17.30012331525704!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971232020!6m8!1m7!1sCAoSLEFGMVFpcE1HWTIwMnZyU0xhVGxHUy05LVNHYUNUb2FpWmZQOXl6Rm5uSi1C!2m2!1d35.7759946277362!2d10.8332796022296!3f160.64162363343289!4f-9.309187174000314!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971263700!6m8!1m7!1sCAoSLEFGMVFpcE1LRDlSSGNZWGl2al93Nkszd1E1UUZjcWV6OEFJLTlZSzdCMDJl!2m2!1d36.79916113475753!2d10.17541889101267!3f9.587751085349169!4f-0.8239336236219401!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971332909!6m8!1m7!1sCAoSLEFGMVFpcE5WS0JrcnJLSk5EVGFkYjBxQ0JaVnA2RjBfWndNMWJTdnZuM3k2!2m2!1d7.4977177!2d4.5886898!3f292.28785754739965!4f-1.461714870117504!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971380793!6m8!1m7!1sCAoSLEFGMVFpcE4zbkpJWkxaNFB1Z2c1Y0drSnJoLUhCLTk5cFRPQUtrMjVCNXl1!2m2!1d9.055229299999999!2d7.364913400000001!3f164.37096259436427!4f-16.03325754370924!5f0.7053868135331123" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971492585!6m8!1m7!1ssnxKNlv9o1dSt5YJZMWDkA!2m2!1d7.850310213760871!2d6.727684593434483!3f53.41893822865474!4f-15.841943918376856!5f0.9096719005228833" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971520896!6m8!1m7!1sZCBk5zyHrtb1w9sVUe9mBA!2m2!1d6.739252862115639!2d-1.535402051167635!3f267.02075625293634!4f-18.71369032862131!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971572224!6m8!1m7!1sfJ2QySki1muxlgPBqMsnlg!2m2!1d14.7857407362849!2d-16.92469996512441!3f85.17733907721583!4f-16.689728276205457!5f0.42739544376827543" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>','<iframe src="https://www.google.com/maps/embed?pb=!4v1638971638341!6m8!1m7!1sCAoSLEFGMVFpcE0tTXdIUVA1QTk5RjZfOW0zRkhENmxTNjM1Uno4YV92QWFTU1NE!2m2!1d31.63901912221427!2d-8.014924433355873!3f273.9687303294244!4f-13.630470485993769!5f0.7820865974627469" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden;" allowfullscreen="" loading="lazy"></iframe>'];


// chooseCreate.classList.remove('active-btn');
// chooseHome.classList.add('active-btn');
// nextMap.style.display = 'block';


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
    socket.emit('start-game', roomId);
})

playAgain.addEventListener('click', () => {
    socket.emit('play-again', roomId);
})

exitGame.addEventListener('click', () => {
    console.log('exitGame is clicked');
    window.location.reload();
})

socket.on('game-display', rooms => {
    playersScore.innerHTML = '<tr><th>Players</th><th>Score</th></tr>';
    for(let i=0; i<rooms.length; i++){
        playersScore.innerHTML+='<tr><td style="color: white;">' + rooms[i][4] + '</td><td style="color: white;">0</td></tr>';
    }
    startScreen.style.display = 'none';
    waitingScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    nextMap.click();
    
})

// let gen = 0;
function genRandWorld(){
    // gen++;
    // console.log('genRandWorld() is called', gen);
    locIndex = Math.floor(Math.random(worldLocs.length)*worldLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        // console.log('I am calling street-display');
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
    }else{
        genRandFamous();
    }
}
function genRandMid(){
    locIndex = Math.floor(Math.random(midLocs.length)*midLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
    }else{
        genRandMid();
    }
}
function genRandAsia(){
    locIndex = Math.floor(Math.random(asLocs.length)*asLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
    }else{
        genRandAsia();
    }
}
function genRandNA(){
    locIndex = Math.floor(Math.random(naLocs.length)*naLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
    }else{
        genRandNA();
    }
}
function genRandSA(){
    locIndex = Math.floor(Math.random(saLocs.length)*saLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
    }else{
        genRandSA();
    }
}
function genRandAus(){
    locIndex = Math.floor(Math.random(auLocs.length)*auLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
    }else{
        genRandAus();
    }
}
function genRandAfr(){
    locIndex = Math.floor(Math.random(afLocs.length)*afLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
    }else{
        genRandAfr();
    }
}
function genRandEur(){
    locIndex = Math.floor(Math.random(euLocs.length)*euLocs.length);
    if(!chosenLocs[locIndex]){
        chosenLocs[locIndex] = 1;
        socket.emit('display-street', ({roomId, locIndex}));
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
// let nxt = 0;
nextMap.addEventListener('click', () => {
    // nxt++;
    // console.log('nextMap is called', nxt);
    nextMap.style.display = 'none';
    
    nextCnt++;
    if(nextCnt==8){
        socket.emit('round-over', roomId);        
    }else{
        
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
    }
})

socket.on('display-error', message => {
    alert(message);
})

socket.on('room-created', () => {
    playerId = 1;
    createScreen.style.display = 'none';
    waitingScreen.style.display = 'block';
    chooseCreate.disabled = true;
    chooseJoin.disabled = true;
    nextMap.style.display = 'block';
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
// let st = 0;
socket.on('street-display', (locIndex, Cmode) => {
    confirPin.disabled = false;
    disDisplay.innerHTML = '';
    stopCount = false;
    round++;
    roundDis.innerHTML = "<span class='round' style='color: white;'>Round: " + round + "/7</span>";
    // st++;
    // console.log('Street display is called', st);
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

    async function countdown() {
        return new Promise((res, rej) => {
          let seconds = 60;
          const interval = setInterval(() => {
            if (seconds === 0) {
              clearInterval(interval);
              res()
              if(playerId == 1){
                nextMap.click();
              }
            }else if(stopCount){
                clearInterval(interval);
                res()
            }
            timeDis.innerHTML = "<span class='time' style='color: white;'>00" + ":" + (seconds < 10 ? "0" : "") + String(seconds) + "</span>"; 
            // console.log(seconds) 
            seconds--;
          }, 1000);
        });
    }
    countdown()
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
    if(playerId!=1){
        playAgain.style.display = 'none';
    }
    nextMap.style.display = 'none';
    gameScreen.style.display = 'none';
    startScreen.style.display = 'flex';
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
        if(rooms[1][5]==rooms[0][5] && rooms[1][5]!=rooms[2][5]){
            winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>1st</h2><span>'+ rooms[1][4] + ', ' + rooms[0][4] + '</span></div><div class="col-md-4"><h2>2nd</h2><span>'+ rooms[2][4] + '</span></div></div>';
        }else if(rooms[1][5]==rooms[2][5] && rooms[1][5]!=rooms[0][5]){
            winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>2nd</h2><span>'+ rooms[1][4] + ', ' + rooms[2][4] + '</span></div><div class="col-md-4"><h2>1st</h2><span>'+ rooms[0][4] + '</span></div></div>';
        }else if(rooms[1][5]==rooms[2][5] && rooms[1][5]==rooms[0][5]){
            winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>1st</h2><span>'+ rooms[1][4] + ', ' + rooms[2][4] + ', ' + rooms[0][4] + '</span></div></div>';
        }else{
            winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>2nd</h2><span>'+ rooms[1][4] + '</span></div><div class="col-md-4"><h2>1st</h2><span>'+ rooms[0][4] + '</span></div><div class="col-md-4"><h2>3rd</h2><span>'+ rooms[2][4] + '</span></div></div>';
        }
    }else if(rooms.length==2){
        if(rooms[0][5]==rooms[1][5]){
            winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>1st</h2><span>'+ rooms[1][4] + ', ' + rooms[0][4] + '</span></div></div>';
        }else{
            winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>2nd</h2><span>'+ rooms[1][4] + '</span></div><div class="col-md-4"><h2>1st</h2><span>'+ rooms[0][4] + '</span></div></div>';
        }
    }else if(rooms.length==1){
        winnersList.innerHTML = '<div class="row"><div class="col-md-4"><h2>1st</h2><span>'+ rooms[0][4] + '</span></div></div>';
    }
    
})

socket.on('all-users-clicked', () => {
    stopCount = true;
    if(playerId==1 && nextCnt!=7){
        nextMap.style.display = 'block';
    }else if(playerId==1 && nextCnt==7){
        nextMap.style.display = 'block';
        nextMap.innerText = 'Finish';
    }
})

socket.on('play-again-screen', rooms => {
    winnersScreen.style.display = 'none';
    createScreen.style.display = 'none';
    waitingScreen.style.display = 'block';
    chooseCreate.disabled = true;
    chooseJoin.disabled = true;
    nextMap.style.display = 'block';
    playersList.innerHTML = '';
    round = 0-(rooms.length-1);
    nextCnt = 0;
    for(let i=0; i<rooms.length; i++){
        playersList.innerHTML += "<span><i style='color: green;' class='fas fa-circle'></i> " + rooms[i][4] + "</span><br>";
    }
    
})

 