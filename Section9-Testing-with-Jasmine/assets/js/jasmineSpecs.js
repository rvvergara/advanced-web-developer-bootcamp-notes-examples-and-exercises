describe("push method",function(){
    let arr;
    beforeEach(function(){
        arr = [1,2,3];
    });
    it("adds an element to the end of the array",function(){
        arr.push(4);
        expect(arr).toEqual([1,2,3,4]);
    });
    it("returns the new length of the array",function(){
        expect(arr.push(5)).toEqual(arr.length);
    });
    it("adds anything to the array",function(){
        expect(arr.push({})).toEqual(4);
    });
});

describe("Counting",function(){
    let count = 0;
    beforeEach(function(){
        count++;
    });
    afterEach(function(){
        count = 0;
    });
    it("has a counter that increments",function(){
        expect(count).toBe(1);
        expect(count).toEqual(1);
    });
    it("gets reset",function(){
        expect(count).toBe(1);
    });
});

describe("Add function",function(){
    it("adds numbers",function(){
        spyOn(window,"add").and.callThrough();
        add(1,2,3);
        expect(add).toHaveBeenCalled();
        expect(add).toHaveBeenCalledWith(1,2,3);
        expect(add(1,2,3,4)).toEqual(6);
        expect(add.calls.count()).toBe(2);
        expect(add.calls.argsFor(0)).toEqual([1,2,3]);
        expect(add.calls.argsFor(1)).toEqual([1,2,3,4]);
        expect(add.calls.allArgs()).toEqual([[1,2,3],[1,2,3,4]]);
    });
});
describe("windows object",function(){
    it("can have methods which are global functions",function(){
        getColor = jasmine.createSpy("getColor spy");
        getColor();
        expect(getColor).toHaveBeenCalled();
    });
});