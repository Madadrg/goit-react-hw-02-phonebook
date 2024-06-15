const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Replace with your MongoDB URI
mongoose.connect('mongodb://localhost:27017/contact-book', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const contactSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  phone: String,
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

const jwtSecret = 'your_jwt_secret';

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, jwtSecret);
  res.send({ token });
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Unauthorized' });

  try {
    const { userId } = jwt.verify(token, jwtSecret);
    req.userId = userId;
    next();
  } catch {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

app.get('/contacts', authMiddleware, async (req, res) => {
  const contacts = await Contact.find({ userId: req.userId });
  res.send(contacts);
});

app.post('/contacts', authMiddleware, async (req, res) => {
  const { name, phone } = req.body;
  const contact = new Contact({ userId: req.userId, name, phone });
  await contact.save();
  res.status(201).send(contact);
});

app.delete('/contacts/:id', authMiddleware, async (req, res) => {
  await Contact.deleteOne({ _id: req.params.id, userId: req.userId });
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
