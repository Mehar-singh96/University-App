var SERVER_URL = 'http://dev.cs.smu.ca:8140';


function delete_Mongo(){


			var name = $("#search").val();
			var key = {"Name":name};
			$.post(SERVER_URL + "/delete_university", key,function (data) {
			var data_uni = data;
			if (data_uni == null || data_uni.length == 0) {
			alert("No Record Found");
			} else {
			alert("Record deleted");
			 }
			}).fail(function (error) {
			alert("Error: " + error.responseText);
			 });
}



function search_uni(){

			var name = $("#search").val();
			var key = {"Name":name};
			$.post(SERVER_URL + "/get_university", key,function (data) {
			var data_uni = data;
			if (data_uni == null || data_uni.length == 0) {
			alert("No Record Found");
			} else {
			$("#name").val(data_uni.Name);
			$("#address").val(data_uni.Address);
			$("#phone").val(data_uni.Phone);
			 }
			}).fail(function (error) {
			alert("Error: " + error.responseText);
			 });
}


function save_uni(){

			 if(check_record()){
				var newObj = {
				"Name": $("#name").val(),
				"Address": $("#address").val(),
				"Phone": $("#phone").val()
			};
			alert('Save in progress');

			$.post(SERVER_URL + "/save_university",
			newObj,
			function (data) {
			alert("Result saved successfully!");
			}).fail(function (error) {
			alert("Error: " +error.responseText);
			});

			}
}

function check_record(){

var name = $("#name").val();
var address = $("#address").val();
var phone = $("#phone").val()

			if (name == '') {
			alert("Name of the university cannot be empty!");
			$("#name").focus();
			return false;
			}
			if (address == '') {
			alert("Address field cannot be empty!");
			$("#address").focus();
			return false;
			}
			if (phone == '') {
			alert("Phone number cannot be empty!");
			$("#phone").focus();
			return false;
			}

			var tokens = phone.split('-');
			for (var i = 0; i < tokens.length; i++) {
			if (isNaN(tokens[i])) {
			alert("Use numbers only for Phone number!");
			$("#phone").focus();
			return false;
			}
			}


			var firstChar = address.trim().substr(0, 1);
			if (isNaN(firstChar)) {
			alert("Address should start with a number!");
			$("#address").focus();
			return false;
			}
return true;
}

function display_mongoData(){
			alert("display");
			$.post(SERVER_URL + "/get_all_universities",function (data) {
			var data_uni = data;
			if (data_uni == null || data_uni.length == 0) {
			alert("No Record Found");
			} else {
			$("#displayTable").html(
			"   <tr>" +
			"     <th>Name</th>" +
			"     <th>Address</th>" +
			"     <th>Phone</th>" +
			"   </tr>"
			);
			var table = document.getElementById('displayTable');
			for (var i = 0; i < data_uni.length; i++) {
				var name = data_uni[i].Name;//Name attribute
				var address = data_uni[i].Address; // Address attribute
				var phone = data_uni[i].Phone; //PhoneNumber attribute
				var r = table.insertRow();
				r.insertCell(-1).innerHTML = name;
				r.insertCell(-1).innerHTML = address;
				r.insertCell(-1).innerHTML = phone;
			}
			 }
			}).fail(function (error) {
			alert("Error: " + error.responseText);
			 });
			 
}