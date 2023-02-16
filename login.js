$(document).ready(function() {
	// Hide the main 
	$("#main").hide();

	//  login form submission
	$("form").submit(function(event) {
		event.preventDefault();
    // Get the username and password
		var username = $("#username").val();
		var password = $("#password").val();

		// Check 
		if (username === "admin" && password === "12345") {
			// Show the main section
			$("#login").hide();
			$("#main").show();

			// Load list
			loadTodoList();

			//  todo list 
			$("#todo-link").click(function(event) {
				event.preventDefault();
				$("#todo").show();
			});

			//  logout link 
			$("#logout-link").click(function(event) {
				event.preventDefault();
				// Hide the main section
				$("#main").hide();
				// Show the login section
				$("#login").show();
			});
		} else {
			alert("Invalid username or password");
		}
	});

	// Load the todo list
	function loadTodoList() {
		$.ajax({
			url: "https://jsonplaceholder.typicode.com/todos",
			method: "GET"
		}).done(function(data) {
			// Build the todo list table
			var table = "";
			var count = 0;
			for (var i = 0; i < data.length; i++) {
				var todo = data[i];
				table += "<tr>";
				table += "<td>" + todo.id + "</td>";
				table += "<td>" + todo.title + "</td>";
				table += "<td>";
				if (todo.completed) {
					table += "<input type='checkbox' checked disabled>";
					count++;
				} else {
					table += "<input type='checkbox' class='todo-check'>";
				}
				table += "</td>";
				table += "</tr>";
			}
			$("#todo-list").html(table);

			// Handle todo checkbox click
			$(".todo-check").click(function() {
				if ($(".todo-check:checked").length >= 5) {
					//  congratulations message
					alert("Congrats. 5 Tasks have been Successfully Completed");

					// Disable the todo checkboxes
					$(".todo-check").attr("disabled", true);
				}
			});
		});
	}
});

