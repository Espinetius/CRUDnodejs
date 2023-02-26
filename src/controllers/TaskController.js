const { request } = require("http");

function index(req,res) {
    res.render('tasks/index');
}

function create(req, res) {
    res.render('tasks/create');
}

function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM asignatura', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/index', { tasks });
      
    });
  });
}
exports.findAllAsignaturas = function(req, res) {
    
}
function store(req,res) {
    const data = req.body;
    req.getConnection((err, conn )=> {
            conn.query("INSERT INTO asignatura SET ?", [data], (err,rows) => {
            res.redirect('/tasks');
            console.log("POST /asignaturas");
        });
    });

}
function destroy(req, res) {
  const data = req.body;
  req.getConnection((err, conn) => {
        conn.query('DELETE FROM asignatura WHERE id = ?', [data.id], (err, rows) => {
        res.redirect('/tasks');
    });
  })
}
function edit(req, res) {
  const data = req.params;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM asignatura WHERE id = ?', [data.id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
  
}

function update(req, res) {
  const id = req.params.id;
  const data = req.body;

    req.getConnection((err, conn) => {
    result =  conn.query('UPDATE asignatura SET ? WHERE id = ?', [data, id], (err, rows) => {
      res.redirect('/tasks');
      
    });
    res.json(result);
  }); 
}

module.exports = {
    index:index,
    create: create,
    store: store,
    destroy: destroy,
    edit: edit,
    update: update,

}