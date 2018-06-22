<h1>Section 15- ES2015 Part I</h1>
<h2>ES2015 Features"</h2>
<ul>
    <li>
        <h3><code>const</code></h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"><code>const</code> MDN Doc</a></p>
    </li>
    <li>
        <h3><code>let</code></h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"><code>let</code> MDN docs</a></p>
    </li>
    <li>
        <h3>Template strings</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">Template literals/strings MDN doc</a></p>
    </li>
    <li>
        <h3>Arrow functions</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions">Arrow functions MDN doc</a></p>
        <p><a href="https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc">Arrow functions for Beginners - Codeburst</a></p>
        <p><a href="https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/">Arrow functions: Fat and Concise Syntax in Javascript - Sitepoint</a></p>
        <h4>The catch with Arrow functions:</h4>
        <ul>
            <h4><code>this</code> keyword</h4>
            <li>they don't get their own <code>this</code> keyword</li>
            <li>inside of arrow functions, <code>this</code> has its original meaning from enclosing context</li>
            <li>the fact that arrow functions don't have their own <code>this</code> keyword can be quite helpful- you just need to understand when you might <strong>NOT</strong> want that</li>
            <h4><code>arguments</code> keyword</h4>
            <li>Arrow functions also don't get their own <code>arguments</code> keyword</li>
            <li>An <code>arguments</code> keyword can be accessed if the arrow function is inside another<code>function</code>
            <p>
                <code>
                    function(outer){
                        return innerFunction = ()=> {<br>
                        &nbsp;&nbsp;return arguments;<br>
                        &nbsp;&nbsp;}<br>
                    }<br>
                    outer(1)(2); //Prints only 1
                </code>
            </p>
            </li>
        </ul>
        <p>Arrow functions should <strong>NEVER</strong> be used for creating methods in objects since we will get the incorrect value of <code>this</code>.</p>
    </li>
    <li>
        <h3>Default parameters</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters">Default parameters MDN doc</a></p>
    </li>
    <li>
        <h3><code>for...of</code> loops</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of"><code>for..of MDN doc</code></a></p>
    </li>
    <li>
        <h3>Rest operator</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters">Rest parameters MDN doc</a></p>
        <ul>
            <li>Rest operator always returns an array</li>
            <li>Is called the rest operator <em>only</em> when it's a parameter to a function</li>
        </ul>
    </li>
    <li>
        <h3>Spread</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax">Spread syntax MDN doc</a></p>
        <ul>
            <li>Used on arrays to spread each value out (as a comma separated value)</li>
            <li>Useful when you have an array, but what you are working with expects comma separated values</li>
            <li>Used on arrays to spread each value out (as a comma separated value)</li>
            <li>Useful when you have an array, but what you are working with expects comma separated values</li>
        </ul>
    </li>
    <li>
        <h3>Object shorthands</h3>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer">Object shorthands MDN doc</a></p>
        <p><a href="https://eslint.org/docs/rules/object-shorthand">Object shorthand rules ESLINT.org</a></p>
    </li>
    <li>
        <h3>Destructuring</h3>
        <p>Extracting values from data stored in objects and arrays</p>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">Destructuring Assignment MDN Doc</a></p>
        <p><a href="http://2ality.com/2015/01/es6-destructuring.html">ES6 Descructuring- 2ality</a></p>
        <p><a href="https://dev.to/sarah_chima/destructuring-assignment---arrays-16f">Destructuring Assignment in ES6- Arrays</a></p>
    </li>
    <li><h3></h3></li>
</ul>

<h3>Resources</h3>
<p><a href="http://webdev.slides.com/eschoppik/es2015#/">Section slides</a></p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">Less Used features in ES2015-Proxies</a></p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect">Less Common feature in ES2015-Reflect</a></p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol">Less Common feature in ES2015-Symbol</a></p>