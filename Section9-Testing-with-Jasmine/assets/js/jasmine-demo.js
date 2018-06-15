function add(a,b,c){
    return a+b+c;
}

describe("add",function(){
    let addSpy, result;
    beforeEach(function(){
        addSpy = spyOn(window,"add").and.callThrou();
        result = addSpy(1,2,3);
    });
    it("can have a return value",function(){
        expect(result).toBe(6);
    });
});