const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const{Usermodel} = require("../modals/user.modal")

const GOOGLE_CLIENT_ID="98535905834-hnpotlkhe5ai1m8uaflu9mjfghosa7i4.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4800/check/google/auth/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const existingUser = await Usermodel.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new Usermodel({
      email: profile.id,
      name: profile.name.givenName,
      password:"abcd1233"
    
    }).save();
    done(null, user);
  }
));
passport.serializeUser((user,done)=>{
    done(null,user)

})
passport.deserializeUser((user,done)=>{
    done(null,user)
})