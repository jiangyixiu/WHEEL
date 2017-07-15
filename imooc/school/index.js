const klass = require('./klass');

exports.add = function (klasses) {
  klasses.forEach(function (item, index) {
    let _klass = item;
    let teacherName = item.teacherName;
    let students = item.students;
    klass.add(teacherName, students);
  }, this);
}