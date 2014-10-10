function error_check() {
    var error_check = location.search;
    if (error_check ==="") {
        window.location.href = "/?error=nouserid"; 
    return;
    }  
}
