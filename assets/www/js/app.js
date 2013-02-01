(function ($) {
	var self = $.mobile.EdyTask ={
		init : function(){
			console.log("init");

			$('#newTask').live('pageshow', function(){
				console.log("newTask Loaded")
				var today = (new Date()).toLocaleString();
				$('#date').val(today);

				$('#create').off('click').on('click', function(){
					self.createTask();

				});
			});

		},
		connection : null,
		openDatabase: function() {
			self.connection = window.openDatabase("edytask", "1.0", "edytask", 200000);			
		},
		transaction : function (fn,err,suc) {
			if(self.connection==null){
				self.openDatabase();
			}

			self.connection.transaction(fn,err,suc)
		},
		createTask: function(){
			var task = [$('#title').val(),
			$('#description').val(),
			$('#date').val(),
			null
			];				
			console.log(task);

			self.transaction(function(tx){

					//tx.executeSql('DROP TABLE IF EXISTS tasks');
					tx.executeSql('CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY ASC, title VARCHAR, description TEXT, date VARCHAR, picture TEXT)');
					tx.executeSql('INSERT INTO tasks (title, description, date, picture) VALUES (?,?,?,?)', task, function(tx){
						console.log("succes", tx);
					}, function(tx, err){
						self.error(err);
					});
				})	
		},
		error : function(err){
			console.error("error",err);
			alert("ERROR!!! "+err. message);
		},


	};

	self.init();
})(jQuery);