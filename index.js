'use strict';
//Dati account
let account = ['davide'];

let accountData = {
	davide: {
		nome: 'Davide',
		cognome: 'Prova',
		password: '123',
		email: 'davide@prova.it',
		piano: 'Premium',
		idConto: 'davpro001',
		importiConto: [
			{ importo: 1000, notaSpesa: 'Stipendio - arch invest' },
			{ importo: -100, notaSpesa: 'Zara' },
			{ importo: -450, notaSpesa: 'Bonifico: Affitto' },
			{ importo: -20, notaSpesa: 'Pizzeria Napoli srl' },
			{ importo: -30, notaSpesa: 'Gamestop Varese' },
			{ importo: 1200, notaSpesa: 'Bonifico' },
			{ importo: -350, notaSpesa: 'Bonifico' },
		],
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

	let totaleConto = 0.0;
	if (accountData[currentUser].importiConto[0]) {
		for (const i in accountData[currentUser].importiConto) {
			let notaSpesa = accountData[currentUser].importiConto[i].notaSpesa;
			let importoAttuale =
				accountData[currentUser].importiConto[i].importo;
			totaleConto += importoAttuale;

			$('.list-group')
				.append(`<div class="list-group-item text-bg-dark d-flex gap-3 py-3 shadow" aria-current="true">
			${
				importoAttuale > 0
					? '<i class="bi bi-plus"></i>'
					: '<i class="bi bi-dash"></i>'
			}
			<div class="d-flex gap-2 w-100 justify-content-between">
				<div>
					<h4 class="mb-0">${Math.abs(importoAttuale).toLocaleString('it-IT')} €</h4>
					<p class="mb-0 opacity-75">${notaSpesa}</p>
				</div>
			</div>
		</div>`);
		}
	}
	$('#totaleConto').text(
		`${totaleConto.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €`
	);

	let totaleInv = 0.0;
	if (accountData[currentUser].investimenti) {
		for (const i in accountData[currentUser].investimenti) {
			accountData[currentUser].investimenti[i].forEach((element) => {
				totaleInv += element[1];
			});
		}
	}
	$('#totaleInv').text(
		`${totaleInv.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €`
	);

	let totaleCrypto = 0.0;
	if (accountData[currentUser].crypto) {
		accountData[currentUser].crypto.forEach((element) => {
			totaleCrypto += element[1];
		});
	}
	$('#totaleCrypto').text(
		`${totaleCrypto.toLocaleString('it-IT', {
			minimumFractionDigits: 2,
		})} €`
	);

	$('#idConto').text(accountData[currentUser].idConto);

	$('#tipoConto').text(accountData[currentUser].piano);
}

function iscrizione() {
	let nome = $('#inputNome').val();
	let cognome = $('#inputCognome').val();
	let email = $('#inputEmail').val();
	let username = $('#inputUserName').val();
	let password = $('#inputPassword').val();
	let piano = $('#inputPiano').val();
	let lunghezza = Object.keys(accountData).length + 1;
	let idConto =
		nome.slice(0, 3).toLowerCase() +
		cognome.slice(0, 3).toLowerCase() +
		lunghezza.toString().padStart(3, '0');
	accountData[username] = {
		nome: nome,
		cognome: cognome,
		password: password,
		email: email,
		piano: piano,
		idConto: idConto,
		importiConto: [0.0],
	};
	account.push(username);
	$('#iscrModal').modal('toggle');
	$('#modalOk').modal('toggle');
	console.log(accountData);
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
		iscrizione();
	}
});

$('#btnCloseIscrizione').click(function (e) {
	e.preventDefault();
	$('#inputNome').val('');
	$('#inputCognome').val('');
	$('#inputEmail').val('');
	$('#inputUserName').val('');
	$('#inputPassword').val('');
	$('#inputPiano').val('Base');
	$('#gridCheck').prop('checked', false);
});
