describe("a simple setTimeout",function(){
    let sample;
    beforeEach(function(){
        sample = jasmine.createSpy("clock spy");
        jasmine.clock().install();
    });

    afterEach(function(){
        jasmine.clock().uninstall();
    });

    it("is only invoked after 1000ms",function(){
        setTimeout(function(){
            sample();
        },1000);
        jasmine.clock().tick(999);
        expect(sample).not.toHaveBeenCalled();
        jasmine.clock().tick(1);
        expect(sample).toHaveBeenCalled();
    });

});

describe("a simple setInterval function",function(){
    let dummy;
    beforeEach(function(){
        dummy = jasmine.createSpy("spy interval");
        jasmine.clock().install();
    });
    afterEach(function(){
        jasmine.clock().uninstall();
    });

    it("calls the function after every 1000ms",function(){
        setInterval(function(){
            dummy();
        },1000);
        jasmine.clock().tick(999);
        expect(dummy).not.toHaveBeenCalled();
       
        jasmine.clock().tick(1000);
        expect(dummy.calls.count()).toEqual(1);
        
        jasmine.clock().tick(1);
        expect(dummy.calls.count()).toEqual(2);
    });
});

describe("simple asynchronous functions",function(){
    describe("getUserInfo function",function(){
        it("returns the correct name of the user",function(done){
            getUserInfo("rvvergara").then(function(data){
                expect(data.name).toEqual("ryanv");
                done();
            });
        });
    });
});