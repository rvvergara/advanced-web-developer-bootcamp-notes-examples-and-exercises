<h1>Section 11- Closures and the Keyword <code>this</code></h1>
<<<<<<< HEAD
<p><a href="http://webdev.slides.com/eschoppik/closures-and-the-keyword-this#/">Section Slides</a></p>
=======
>>>>>>> 94baccacf178e9d7d0ea65e056cbe55a4488e6a8
<h2><code>this</code> Keyword</h2>
<h3>Four Rules for determining</h3>
<ol>
    <li>
        <h4>Global Context</h4>
        <p>when <code>this</code> is not inside of a declared object
            its value is the 'window' object (in browser)
        </p>
        <p>
            when <code>"use strict"</code>/strict mode <code>this</code> when inside a function or when a 
		variable is declare inside a function it is undefined in the global obj.
        </p>
    </li>
    <li>
        <h4>Implicit/Declared in Object</h4>
        <p>
            When <code>this</code> is inside of a declared object its
		value is the closest parent object
        </p>
    </li>
    <li>
        <h4>Explicit Binding</h4>
        <ul>
            <li>call -> immediately invoked -> fn.call(thisArg,a,b,c...)</li>
            <li>apply -> immediately invoked -> fn.apply(thisArg,[a,b,c...])</li>
            <li>bind -> returns a function def -> fn.bind(thisArg,a,b,c,d...)-> 
                useful when using asynchronous functions (or functions called later)
                and when we do not know the exact arguments
            </li>
        </ul>
    </li>
    <li>
        <h4>The <code>new</code> keyword</h4>
        <p>
                <code>new</code> keyword when called will create a new object. The <code>this</code>
                refers to the new object.
        </p>
    </li>
</ol>