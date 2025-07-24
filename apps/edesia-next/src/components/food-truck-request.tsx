import { Label } from "@/components/ui/common/label";
import { Input } from "@/components/ui/common/input";
import { Textarea } from "@/components//ui/common/textarea";
import { RadioGroupItem, RadioGroup } from "@/components/ui/common/radio-group";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore"; 
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { db}  from "@/components/firebase";
import { auth } from "@/components/firebase";

// Define interface for user
interface User {
  userId: string;
  email: string;
  companyName: string;
  companyRole: string;
  firstName: string;
  lastName: string;
  phone: string;
  // Add other properties here based on your schema
}

// Define interface for form values
interface FormValues {
  email: string;
  companyName: string;
  companyRole: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
  userId: string;
  eventName: string;
  attendees: string;
  status: string;
  endDate: string;
  startDate: string;
  budget: string;
  paymentBy: string;
}

export function FoodTruckRequest() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    companyName: "",
    companyRole:"",
    firstName: "",
    lastName:"",
    address: "",
    description: "",
    userId: "",
    eventName: "",
    attendees: "",
    status:"",
    endDate: "",
    startDate: "",
    budget:"",
    paymentBy:"",
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserData(auth.currentUser.uid);
    }
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userQuery = query(collection(db, 'Users'), where('userId', '==', userId));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        userSnapshot.forEach((doc) => {
          const userData = doc.data() as User;


          setCurrentUser(doc.data() as User);
          console.log('User data:', userData);
        });
      } else {
        console.log('User data not found');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'TestBookings'), formValues);
      console.log('Document written with ID: ', docRef.id);
      // Reset form values after submission
      setFormValues({
        email: "",
        companyName: "",
        companyRole:"",
        firstName: "",
        lastName: "",
        address: "",
        description: "",
        userId: "",
        eventName: "",
        attendees: "",
        status: "",
        endDate: "",
        startDate: "",
        budget: "",
        paymentBy: "",
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="space-y-4">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Create an Event</h1>
      <p className="text-gray-500 dark:text-gray-400">Enter the details for your event</p>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="event-name">Event Name</Label>
        <Input id="event-name" name="eventName" placeholder="Enter the event name" value={formValues.eventName} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="event-description">Event Description</Label>
        <Textarea className="min-h-[100px]" id="event-description" name="description" placeholder="Enter the event description" value={formValues.description} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="event-location">Event Location</Label>
        <Input id="event-location" name="address" placeholder="Enter the event location" value={formValues.address} onChange={handleChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="event-start-time">Event Start Time</Label>
          <Input id="event-start-time" name="startDate" placeholder="Enter the event start time" type="datetime-local" value={formValues.startDate} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="event-end-time">Event End Time</Label>
          <Input id="event-end-time" name="endDate" placeholder="Enter the event end time" type="datetime-local" value={formValues.endDate} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="attendees">Number of Attendees</Label>
        <Input id="attendees" name="attendees" placeholder="Enter the number of attendees" type="number" value={formValues.attendees} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="budget">Estimated Budget</Label>
        <Input id="budget" name="budget" placeholder="Enter the estimated budget" value={formValues.budget} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label> Who is Paying</Label>
        <RadioGroup defaultValue={formValues.paymentBy}>
          <RadioGroupItem value="attendees">Attendees</RadioGroupItem>
          <RadioGroupItem value="host">Host</RadioGroupItem>
        </RadioGroup>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
    </form>
  </div>
);
}