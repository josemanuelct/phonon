phonon.options ({
		navigator: {
			defaultPage: 'home',
			animatePages: true,
			enableBrowserBackButton: true,
			templateRootDirectory: './tpl'


		},
		i18n: null
});

var app = phonon.navigator();

app.on({page: 'home', preventClose: false, content: null});

app.on({page: 'pagetwo', preventClose: true, content: 'pagetwo.html', readyDelay: 1},
	function (activity) {
		var action = null;


		var onAction = function(evt){
			var target = evt.target;
			action = 'ok';

			if (target.getAttribute('data-order') === 'order') {
				phonon.alert('Gracias por su compra!', 'estimado cliente');
			}else{
				phonon.alert('su orden ha sido cancelada', 'estimado cliente');
			}

		};
		activity.onCreate(function() {
			document.querySelector('.order').on('tap',onAction);
			document.querySelector('.cancel').on('tap',onAction);
		});

		activity.onClose(function(self) {
			if (action !== null) {
				self.close();
			}else{
				phonon.alert('Antes de dejar esta pagina, debes realizar una accion', 'accion requerida');
			}
		});


		activity.onHidden(function(){
			action = null;
		});

		activity.onHashChanged(function(pizza){
			document.querySelector('.pizza').textContent = pizza;
		});
	});


app.start();