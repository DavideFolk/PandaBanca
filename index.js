//Dati account
let account = ['davide'];

let accountData = {
	davide: {
		nome: 'Davide',
		cognome: 'Prova',
		password: '123',
		email: 'davide@prova.it',
		piano: 'Premium',
		idConto: 'dapr001',
		importiConto: [1000, -100, 450, -20, -30, 1200, -350],
		investimenti: {
			azioni: [
				['FCA', 1000],
				['BMW', 452.85],
				['BTIcino', 24.51],
			],
			obbligazioni: [
				['Italia 4x3', 2300],
				['Germano Bond', 500],
			],
		},
		crypto: [
			['LispaCoin', 620.84],
			['BitCoin', 120.74],
		],
	},
};

let currentUser;

//Funzioni
function logIn(user) {
	let password = $('#password').val();
	if (account.includes(user) && accountData[user].password === password) {
		$('.nav-item').remove();
		$('.navbar-nav').append(
			'<li class="nav-item" id="logOutBarra"><a class="nav-link active" href="">LogOut</a></li>'
		);
		$('#loginModal').modal('toggle');
		$('.homepage').addClass('hidden');
		$('#spinnerLoading').removeClass('hidden');
		setTimeout(() => {
			$('#spinnerLoading').addClass('hidden');
			$('#homeLogin').removeClass('hidden');
		}, 600);
		renderHome();
	} else {
		$('#errorText').text('Username o password errati!');
	}
}

function renderHome() {
	$('#titleName').text(`Ciao, ${accountData[currentUser].nome}.`);

	let totaleConto = accountData[currentUser].importiConto.reduce(
		(prev, curr) => prev + curr
	);
	$('#totaleConto').text(
		`${totaleConto.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €`
	);

	let totaleInv = 0.0;
	for (const i in accountData[currentUser].investimenti) {
		accountData[currentUser].investimenti[i].forEach((element) => {
			totaleInv += element[1];
		});
	}
	$('#totaleInv').text(
		`${totaleInv.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €`
	);

	let totaleCrypto = 0.0;
	accountData[currentUser].crypto.forEach((element) => {
		totaleCrypto += element[1];
	});
	$('#totaleCrypto').text(
		`${totaleCrypto.toLocaleString('it-IT', {
			minimumFractionDigits: 2,
		})} €`
	);
}

//Onclick modal login
$('#btnLogin').click(function (e) {
	let form = $('#formLogin');
	if (form[0].checkValidity()) {
		e.preventDefault();
		currentUser = $('#username').val().toLowerCase();
		logIn(currentUser);
	}
});

$('#btnClose').click(function (e) {
	e.preventDefault();
	$('#username').val('');
	$('#password').val('');
	$('#errorText').text('');
});

//Onclick modal iscrizione
$('#btnIscrizione').click(function (e) {
	let form = $('#formIscrizione');
	if (form[0].checkValidity()) {
		e.preventDefault();
		console.log('dati scritti');
	}
});

$('#btnCloseIscrizione').click(function (e) {
	e.preventDefault();
	$('#inputNome').val('');
	$('#inputCognome').val('');
	$('#inputEmail').val('');
	$('#inputPassword').val('');
	$('#inputPiano').val('Base');
	$('#gridCheck').prop('checked', false);
});
