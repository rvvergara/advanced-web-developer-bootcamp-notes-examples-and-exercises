<h1>Section 5 - Async Foundations</h1>

<h3>What is an Asynchronous event?</h3>
<p><a href="https://stackoverflow.com/questions/4559032/easy-to-understand-definition-of-asynchronous-event">Stackoverflow Answer</a></p>

<h3>Callback Functions</h3>
<p><a href="http://webdev.slides.com/eschoppik/callbacks#/">Callback Slides</a></p>
<p><a href="./callbacks/">Example Files</a></p>

<h3>Array forEach</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-99-108#/">forEach Slides</a></p>
<p><a href="./forEach/">Example Files</a></p>

<h3>Array findIndex</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-107-16#/">findIndex Slides</a></p>
<p><a href="./findIndex/">Example files</a></p>
<p>Exercise: Implement own findIndex function</p>
<p>My solution:</p>
<pre>
    <code>
        function ownFindIndex(arr,fn){
            for(let i=0;i<arr.length;i++){
                if(fn(arr[i])) return i
            }
            return -1;
        };
    </code>
</pre>

<h3>The Stack and the Heap</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-99-108-17#/">Slides</a></p>
<p><a href="http://webdev.slides.com/eschoppik/mysql-107-16-22#/">Example</a></p>
<p><a href="https://www.youtube.com/watch?v=8aGhZQkoFbQ">What the heck is an event loop? - by Philip Roberts</a></p>

<h3>setTimeout and setInterval</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-99-108-17-23#/">Slides</a></p>
<p>countDown Exercise: - The goal is to Implement a function called countDown that accepts a time in seconds. The function will print the time remain to the console every second. Instead of printing 0, the function should print "Ring Ring Ring!!!".</p>
<p>My solution: </p>
<pre>
    <code>
        function countDown(time){
            let timerId = setInterval(function(){
                console.log("Time remaining:",time);
                time--;
                if(time === 0){
                    console.log("Ring Ring Ring!!!");
                    clearInterval(timerId);
                }
            },1000);
        }
    </code>
</pre>

<h3>The Event Loop and the Queue</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-107-16-18#/">Slides</a></p>

<h3>Promise basics</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-99-108-17-19#/">Slides</a></p>

<h3>Promise Chaining</h3>
<p><a href="http://webdev.slides.com/eschoppik/mysql-107-16-18-24#/">Slides</a></p>