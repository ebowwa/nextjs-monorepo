"use client";
import { useState, useEffect } from 'react';
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { supabase } from '@/components/supabaseClient'; 

const CharacterPromptForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // This function can be called to retrieve the current user ID
  const getUserId = () => supabase.auth.session()?.user?.id;

  const handleAddPrompt = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const userId = getUserId();
    if (!userId) {
      alert("You must be signed in to add prompts.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('prompts')
        .insert([{ title, description, user_id: userId }]);
      
      if (error) throw error;

      console.log("Prompt added successfully: ", data);
      setTitle('');
      setDescription('');
      alert("Prompt added successfully!");
    } catch (error) {
      console.error("Error inserting data: ", error);
      alert("Error adding prompt. Please try again.");
    }
  };

  return (
    <form onSubmit={handleAddPrompt} className="p-4 border-t">
      <Input
        className="mb-2"
        placeholder="Add new prompt title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        className="mb-2 h-20"
        placeholder="Add new prompt personality and instructions"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button className="w-full" type="submit">Add to Library</Button>
    </form>
  );
};

export default CharacterPromptForm;
