<h1>Section 9- Testing with Jasmine</h1>
<p><a href="http://webdev.slides.com/eschoppik/testing-with-jasmine#/">Testing with Jasmine slides</a></p>
<h3>Additional resources:</h3>
<p><a href="https://blog.codeship.com/jasmine-spyon/">Spying on Javascript Methods with Jasmine</a></p>
<p><a href="http://tobyho.com/2011/12/15/jasmine-spy-cheatsheet/">Jasmine Spy Cheatsheet</a></p>
<p><a href="https://medium.com/backticks-tildes/how-to-test-javascript-with-jasmine-framework-2e2b8dfa7a9e">How To Test Javascript with Jasmine Medium article</a></p>
<p>Excerpt from the article, list of default matchers from <a href="https://github.com/JamieMason/Jasmine-Matchers#jasmines-default-matchers">Jamie Mason's repo</a>: </p>
<pre>
    <code>
            expect(array).toBeArray();
            expect(array).toBeArrayOfBooleans();
            expect(array).toBeArrayOfNumbers();
            expect(array).toBeArrayOfObjects();
            expect(array).toBeArrayOfSize(number);
            expect(array).toBeArrayOfStrings();
            expect(array).toBeEmptyArray();
            expect(array).toBeNonEmptyArray();
            expect(boolean).toBeBoolean();
            expect(boolean).toBeFalse();
            expect(boolean).toBeTrue();
            expect(date).toBeAfter(otherDate);
            expect(date).toBeBefore(otherDate);
            expect(date).toBeDate();
            expect(date).toBeValidDate();
            expect(fn).toBeFunction();
            expect(fn).toThrowAnyError();
            expect(fn).toThrowErrorOfType(constructorName);
            expect(mixed).toBeCalculable();
            expect(number).toBeEvenNumber();
            expect(number).toBeGreaterThanOrEqualTo(otherNumber);
            expect(number).toBeLessThanOrEqualTo(otherNumber);
            expect(number).toBeNear(otherNumber, epsilon);
            expect(number).toBeNumber();
            expect(number).toBeOddNumber();
            expect(number).toBeWholeNumber();
            expect(number).toBeWithinRange(floor, ceiling);
            expect(object).toBeEmptyObject();
            expect(object).toBeNonEmptyObject();
            expect(object).toBeObject();
            expect(object).toHaveArray(memberName);
            expect(object).toHaveArrayOfBooleans(memberName);
            expect(object).toHaveArrayOfNumbers(memberName);
            expect(object).toHaveArrayOfObjects(memberName);
            expect(object).toHaveArrayOfSize(memberName, size);
            expect(object).toHaveArrayOfStrings(memberName);
            expect(object).toHaveBoolean(memberName);
            expect(object).toHaveCalculable(memberName);
            expect(object).toHaveDate(memberName);
            expect(object).toHaveDateAfter(memberName, date);
            expect(object).toHaveDateBefore(memberName, date);
            expect(object).toHaveEmptyArray(memberName);
            expect(object).toHaveEmptyObject(memberName);
            expect(object).toHaveEmptyString(memberName);
            expect(object).toHaveEvenNumber(memberName);
            expect(object).toHaveFalse(memberName);
            expect(object).toHaveHtmlString(memberName);
            expect(object).toHaveIso8601(memberName);
            expect(object).toHaveJsonString(memberName);
            expect(object).toHaveMember(memberName);
            expect(object).toHaveMethod(memberName);
            expect(object).toHaveNonEmptyArray(memberName);
            expect(object).toHaveNonEmptyObject(memberName);
            expect(object).toHaveNonEmptyString(memberName);
            expect(object).toHaveNumber(memberName);
            expect(object).toHaveNumberWithinRange(memberName, floor, ceiling);
            expect(object).toHaveObject(memberName);
            expect(object).toHaveOddNumber(memberName);
            expect(object).toHaveString(memberName);
            expect(object).toHaveStringLongerThan(memberName, string);
            expect(object).toHaveStringSameLengthAs(memberName, string);
            expect(object).toHaveStringShorterThan(memberName, string);
            expect(object).toHaveTrue(memberName);
            expect(object).toHaveUndefined(memberName);
            expect(object).toHaveWhitespaceString(memberName);
            expect(object).toHaveWholeNumber(memberName);
            expect(regexp).toBeRegExp();
            expect(string).toBeEmptyString();
            expect(string).toBeHtmlString();
            expect(string).toBeIso8601();
            expect(string).toBeJsonString();
            expect(string).toBeLongerThan();
            expect(string).toBeNonEmptyString();
            expect(string).toBeSameLengthAs();
            expect(string).toBeShorterThan();
            expect(string).toBeString();
            expect(string).toBeWhitespace();
            expect(string).toEndWith(substring);
            expect(string).toStartWith(substring);
    </code>
</pre>
<p>Asymmetric Matchers</p>
<pre>
    <code>
            any.after(date);
            any.arrayOfBooleans();
            any.arrayOfNumbers();
            any.arrayOfObjects();
            any.arrayOfSize(number);
            any.arrayOfStrings();
            any.before(date);
            any.calculable();
            any.emptyArray();
            any.emptyObject();
            any.endingWith(string);
            any.evenNumber();
            any.greaterThanOrEqualTo(number);
            any.iso8601();
            any.jsonString();
            any.lessThanOrEqualTo(number);
            any.longerThan(string);
            any.nonEmptyArray();
            any.nonEmptyObject();
            any.nonEmptyString();
            any.oddNumber();
            any.regExp();
            any.sameLengthAs(string);
            any.shorterThan(string);
            any.startingWith(string);
            any.whitespace();
            any.wholeNumber();
            any.withinRange(floor, ceiling);
    </code>
</pre>