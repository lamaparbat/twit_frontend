## Twitter Login Backend

Stack used:
1. Node js (Express)
2. MongoDB + Mongoose
3. JWT + passportjs



## API ENDPOINTS
1. Signup || Registration
```
POST : /twitter/signup

Payload: {
   username:String,
   password:String
}

Success Response:   res.status(200).send({ message: "User registered successfully !!" });
Failure Response: res.status(500).send({ message: "Failed to registered user !!" });

```

2. Login
```
POST : /twitter/login (Passportjs -> localStrategy)

Payload: {
   username:String,
   password:String
}

Success Response:   res.status(200).send({
                        token: auth.generateToken1(req.user.username, req.user.password),
                        message: "Login successfully !!"
                     });
                     
Failure Response: res.status(500).send({ message: "Failed to registered user !!" });

```

3. Login with twitter (Firebase auth)
```
POST : /twitter/socialAuth

Payload: {
   username:String
}

Success Response:   res.status(200).send({
                        token: auth.generateToken1(req.user.username, req.user.password),
                        message: "Login successfully !!"
                     });
                     
Failure Response: res.status(500).send({ message: "Failed to login !!" });

```

4. Verify token
```
GET : /twitter/validateCache

Headers:  { Authorization: `Bearer ${access_token}` }

Success Response:   res.status(200).send("User verified !!");
                     
Failure Response: res.status(404).send({ message: "Token doesnt exist !!" }); || res.status(404).send({ message: "Session Timeout !!" });

```

5. Logout
```
GET : /twitter/logout

Headers:  { Authorization: `Bearer ${access_token}` }

Success Response:    res.status(200).send("Logout succesfully !!");
                     
Failure Response: res.status(500).send("SERVER ERROR !!")

```

