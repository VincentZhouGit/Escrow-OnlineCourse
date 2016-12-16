pragma solidity ^0.4.2;

contract courseEscrow{
    uint public coursePrice;
    uint public enrollStart;
    uint public enrollEnd;
    uint public quota;
    uint public refundTime;

    address public provider;
    uint public numStudents;
    uint public totalAmount;



    struct Student{
        uint pendingTuition;
        bool purchased;
    }

    mapping(address => Student) students;

    event PurchasedCourse(address _student, uint _amount);
    event WithdrawedCourse(address _student, uint _amount);
    event FailedToWithdraw(address _student, uint _amount);
    event GotTuition(uint _totalAmount);
    event FailedToGetTuition(uint _totalAmount);

    modifier onlyProvider(){
        if(msg.sender != provider){
          throw;
        }
        _;
    }

    modifier refundExpired(){
        if(now > enrollEnd + refundTime){
            throw;
        }
        _;
    }

    function courseEscrow(uint _coursePrice,  uint _enrollStart, uint _enrollEnd,uint _quota, uint _refundTime){
        coursePrice = _coursePrice;
        enrollStart = _enrollStart;
        enrollEnd = _enrollEnd;
        quota = _quota;
        refundTime = _refundTime;

        provider = msg.sender;
        numStudents = 0;
        totalAmount = 0;

    }

    function purchaseCourse() payable returns(bool){
        if(numStudents > quota){
            throw;
        }
        if(msg.value < coursePrice){
            throw;
        }

        if(students[msg.sender].purchased){
            throw;
        }

        students[msg.sender] = Student({pendingTuition: msg.value, purchased:true});
        totalAmount += msg.value;
        numStudents++;
        PurchasedCourse(msg.sender, coursePrice);
        return true;

    }


    function withdraw()  refundExpired returns(bool){
        uint amount = students[msg.sender].pendingTuition;
        if(amount == 0){throw;}
        students[msg.sender].pendingTuition = 0;
        students[msg.sender].purchased = false;

        if (msg.sender.send(amount)) {
            totalAmount -= amount;
            numStudents--;
            WithdrawedCourse(msg.sender, coursePrice);
            return true;
        } else {
            students[msg.sender].pendingTuition = amount;
            students[msg.sender].purchased = true;
            FailedToWithdraw(msg.sender, coursePrice);
            return false;
        }

    }

    function receiveTuition() onlyProvider returns(bool) {
        if (now < enrollEnd + refundTime){
            throw;
        }
        if (msg.sender.send(totalAmount)){
            GotTuition(totalAmount);
            return true;
        }
        else{
            FailedToGetTuition(totalAmount);
            return false;
        }
    }

    function getcoursePrice() returns(uint) {
       return coursePrice;
    }

}
