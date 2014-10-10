function error_check() {
    var error_check = location.search;
        console.log("error_check: ", error_check);
        console.log(typeof(error_check));

    if (error_check ==="") {
        window.location.href = "/?error=nouserid"; 
    return;
    }  
}
