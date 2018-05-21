    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCU14dZ6i9UtHURl7kR8harfGOdgsAV8eI",
        authDomain: "ricardo-imoveis.firebaseapp.com",
        databaseURL: "https://ricardo-imoveis.firebaseio.com",
        projectId: "ricardo-imoveis",
        storageBucket: "ricardo-imoveis.appspot.com",
        messagingSenderId: "871839734647",
        timestampsInSnapshots: true
    };
    firebase.initializeApp(config);

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    // Get data
    function deleteClick(){
        $("#tableBody a.btn-danger").on("click", function(evt){
            var id = $(this).attr("data");
            db.collection("imoveis").doc(id).delete().then(function() {
                printLines();
            }).catch(function(error) {
                $("#message").append("<div class='alert alert-danger' role='alert'>Ops! " + error + "!</div>");
            });
        });    
    };

    function printLines(){
        $("#tableBody").empty();        
        db.collection("imoveis").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var btnRemove = '<td><a href="#" data="'+doc.id+'" id="btnRemove" class="btn btn-danger btn-xs active" role="button" aria-pressed="true">Excluir</a></td>';
                var row = '<tr><th scope="row">'+doc.id+'</th><td>'+doc.data().nome+'</td><td>'+doc.data().local+'</td>'+btnRemove+'</tr>';
                $("#tableBody").append(row);
            });
            deleteClick();            
        });
    }

    $(document).ready(function(){

        printLines();                
        

        $("#btnAdd").on("click", function(evt){

            db.collection("imoveis").add({
                nome: $("#nome").val(),
                local: $("#localizacao").val()
            })
            .then(function(docRef) {
                $("#message").append("<div class='alert alert-success' role='alert'>Registro "+ docRef.id+" incluído com sucesso!</div>");
                printLines();
            })
            .catch(function(error) {
                console.log("Error! " + error);
                $("#message").append("<div class='alert alert-danger' role='alert'>Ops! " + error + "!</div>");
            });

        });



    });