<?php
$errors = [];
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    $phone = trim($_POST["phone"]);
    $gender = isset($_POST["gender"]) ? $_POST["gender"] : "";
    $interests = isset($_POST["interest"]) ? $_POST["interest"] : [];

    // Name validation (only letters and spaces)
    if (!preg_match("/^[a-zA-Z ]+$/", $name)) {
        $errors['name'] = "Name must contain only letters and spaces.";
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format.";
    }

    // Password validation
    if (strlen($password) < 8 || 
        !preg_match("/[A-Z]/", $password) || 
        !preg_match("/[a-z]/", $password) || 
        !preg_match("/\d/", $password) || 
        !preg_match("/\W/", $password)) {
        $errors['password'] = "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 digit, and 1 special character.";
    }

    // Confirm password validation
    if ($password !== $confirm_password) {
        $errors['confirm_password'] = "Passwords do not match.";
    }

    // Phone number validation (digits only, length between 10-15)
    if (!preg_match("/^\d{10,15}$/", $phone)) {
        $errors['phone'] = "Phone number must contain only digits and be between 10 to 15 characters.";
    }

    // Gender selection validation
    if (empty($gender)) {
        $errors['gender'] = "Please select a gender.";
    }

    // Interest validation (at least one checkbox must be selected)
    if (empty($interests)) {
        $errors['interest'] = "Please select at least one interest.";
    }

    // If no errors, process form
    if (empty($errors)) {
        $success = "Registration successful!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
</head>
<body>
    <h2>Registration Form</h2>
    <?php if ($success) echo "<p style='color: green;'>$success</p>"; ?>
    
    <form method="POST">
        <label>Name:</label>
        <input type="text" name="name" required>
        <span style="color: red;"><?php echo $errors['name'] ?? ''; ?></span>
        <br>

        <label>Email:</label>
        <input type="email" name="email" required>
        <span style="color: red;"><?php echo $errors['email'] ?? ''; ?></span>
        <br>

        <label>Password:</label>
        <input type="password" name="password" required>
        <span style="color: red;"><?php echo $errors['password'] ?? ''; ?></span>
        <br>

        <label>Confirm Password:</label>
        <input type="password" name="confirm_password" required>
        <span style="color: red;"><?php echo $errors['confirm_password'] ?? ''; ?></span>
        <br>

        <label>Phone Number:</label>
        <input type="text" name="phone" required>
        <span style="color: red;"><?php echo $errors['phone'] ?? ''; ?></span>
        <br>

        <label>Gender:</label>
        <input type="radio" name="gender" value="Male"> Male
        <input type="radio" name="gender" value="Female"> Female
        <span style="color: red;"><?php echo $errors['gender'] ?? ''; ?></span>
        <br>

        <label>Interests:</label>
        <input type="checkbox" name="interest[]" value="Sports"> Sports
        <input type="checkbox" name="interest[]" value="Music"> Music
        <input type="checkbox" name="interest[]" value="Reading"> Reading
        <span style="color: red;"><?php echo $errors['interest'] ?? ''; ?></span>
        <br>

        <button type="submit">Register</button>
    </form>
</body>
</html>
