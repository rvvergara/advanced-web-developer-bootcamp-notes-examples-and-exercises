<h1>Section 12- Object Oriented Programming with Javascript</h1>
<p><a href="http://webdev.slides.com/eschoppik/oop-in-javascript#/">Section slides</a></p>
<h2>What is Object Oriented Programming?</h2>
<ul>
    <li>
        <h4>a programming model based around the idea of objects and blueprint of objects</h4>
    </li>
    <li>
        <h4>these objects are constructed from what are called "classes" which is like a blueprint. Objects created from classes are called 'instances' of those classes.</h4>
    </li>
    <li>
        <h4>We strive to make our classes abstract and modular so we reuse classes easily and share them among parts of an application</h4>
    </li>
    <li>
        <h4>Javascript does not have classes built in so we just mimic behavior of classes using functions and objects</h4>
    </li>
</ul>
<h3><code>new</code> Keyword revisited</h3>
<ul>
    <li>creates an empty object</li>
    <li>sets <code>this</code> to be that empty object</li>
    <li>adds the line <code>return this</> to the end of the function which follows it</li>
    <li>adds a <code>__proto__</code> property to that empty object which links the prototype property of the constructor function to the empty object</li>
</ul>
<h3>Additional resources:</h3>
<p><a href="https://www.youtube.com/watch?v=PMfcsYzj-9M">Definitive Guide to Object Oriented Javascript</a> |<a href="https://github.com/rvvergara/javascript-notes-templates-etc/tree/master/OOP%20Notes%20and%20Learnings">Notes from this Video tutorial</a></p>

[![Object Oriented Javascript](https://img.youtube.com/vi/PMfcsYzj-9M/0.jpg)](https://www.youtube.com/watch?v=PMfcsYzj-9M)