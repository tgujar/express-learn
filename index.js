const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/logger')

const app = express();

//handlebars middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Init middleware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Homepage Route
app.get('/', (req, res) => res.render('index', {title: 'Member app', members: members})); // route registered first is preserved

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members api routes
app.use('/api/members', require('./routes/api/members'))


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));