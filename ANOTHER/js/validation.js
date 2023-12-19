const validation = new JustValidate("#signup");

validation
    .addField("#name", [{ rule: "required" }])
    .addField("#email", [
        { rule: "required" },
        { rule: "email" },
        {
            validator: (value, next) => {
                return fetch("validate-email.php?email=" + encodeURIComponent(value))
                    .then(response => response.json())
                    .then(json => {
                        if (!json.available) {
                            next(false, "email already taken");
                        } else {
                            next(true);
                        }
                    })
                    .catch(() => {
                        next(false, "Error validating email");
                    });
            },
        },
    ])
    .addField("#password", [{ rule: "required" }, { rule: "password" }])
    .addField("#password_confirmation", [
        {
            validator: (value, fields) => {
                return value === fields["#password"].elem.value;
            },
            errorMessage: "Passwords should match",
        },
    ])
    .onSuccess((event) => {
        document.getElementById("signup").submit();
    });