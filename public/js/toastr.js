function showToastr(type, title) {
    if (type == "success") {
        toastr.success(title);
    } else {
        toastr.error(title);
    }
}