'use client'

import React, { useState } from 'react'
import { Section } from '../_components/Section'
import { MorphingBlob } from '../_components/MorphingBlob'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Place {
  id: number
  name: string
  category: string
  time: string
  mood: string
}

interface Friend {
  id: number
  name: string
  avatar: string
  interests: string[]
  color: string
}

const samplePlaces: Place[] = [
  { id: 1, name: 'Blue Bottle Coffee', category: 'Cafe', time: '9:30 AM', mood: 'Energized' },
  { id: 2, name: 'Golden Gate Park', category: 'Nature', time: '2:15 PM', mood: 'Relaxed' },
  { id: 3, name: 'Tartine Bakery', category: 'Food', time: '11:00 AM', mood: 'Happy' },
  { id: 4, name: 'Ocean Beach', category: 'Outdoors', time: '5:45 PM', mood: 'Peaceful' },
  { id: 5, name: 'SFMOMA', category: 'Culture', time: '3:30 PM', mood: 'Inspired' },
  { id: 6, name: 'The Chapel', category: 'Music', time: '8:00 PM', mood: 'Excited' },
]

const friends: Friend[] = [
  { id: 1, name: 'Sarah', avatar: 'S', interests: ['Coffee', 'Art', 'Brunch'], color: 'from-pink-400 to-rose-500' },
  { id: 2, name: 'Alex', avatar: 'A', interests: ['Hiking', 'Photography', 'Music'], color: 'from-blue-400 to-indigo-500' },
  { id: 3, name: 'Maya', avatar: 'M', interests: ['Brunch', 'Yoga', 'Beaches'], color: 'from-purple-400 to-pink-500' },
  { id: 4, name: 'Jordan', avatar: 'J', interests: ['Fine Dining', 'Wine', 'Museums'], color: 'from-amber-400 to-orange-500' },
  { id: 5, name: 'Chris', avatar: 'C', interests: ['Coffee', 'Tech', 'Hiking'], color: 'from-green-400 to-emerald-500' },
]

interface ConversationMessage {
  role: 'user' | 'ai'
  text: string
}

const conversations: Record<string, ConversationMessage[]> = {
  'Conversation 1: Finding Relaxation': [
    { role: 'user', text: 'Where do I feel most relaxed?' },
    { role: 'ai', text: 'Based on your visits, you feel most relaxed at waterfront locations like Ocean Beach and Golden Gate Park. Your mood data shows a +22% relaxation boost at places near water, especially during late afternoon visits (4-6 PM).' },
    { role: 'user', text: 'Why do you think that is?' },
    { role: 'ai', text: 'Looking at your notes, you often mention feeling "recharged" and "clear-headed" after these visits. The pattern shows these visits happen after stressful work periods. It seems like water + nature helps you decompress.' },
    { role: 'user', text: 'Are there any new spots like this I haven\'t tried?' },
    { role: 'ai', text: 'Yes! Based on your preferences, I recommend Lands End Trail. It combines waterfront views with quiet walking paths. It\'s less crowded than Ocean Beach but has similar sunset views. Best visited 5-6 PM based on your patterns.' },
  ],
  'Conversation 2: Morning Routines': [
    { role: 'user', text: 'What are my favorite morning spots?' },
    { role: 'ai', text: 'Your mornings center around cafes and bakeries. Blue Bottle Coffee (visited 12x) and Tartine Bakery (9x) are your top choices. You prefer arriving between 9-11 AM.' },
    { role: 'user', text: 'Do I go alone or with people?' },
    { role: 'ai', text: 'Interesting pattern here: 85% of your morning cafe visits are solo. Your notes mention "quiet corners" and "great for focus work" — you are using these as productive work sessions, not social hangouts.' },
    { role: 'user', text: 'What do I usually order?' },
    { role: 'ai', text: 'From your notes: at Blue Bottle you mention "the usual" (likely their latte), and at Tartine you specifically note the morning croissant 7 out of 9 times. You are a creature of habit in the mornings!' },
  ],
  'Conversation 3: Happiness Patterns': [
    { role: 'user', text: 'When am I happiest?' },
    { role: 'ai', text: 'Your happiest moments occur during afternoon outdoor activities (2-4 PM) at parks and beaches. Golden Gate Park visits show your highest mood scores (+18%), especially on weekends.' },
    { role: 'user', text: 'Is there a difference between weekdays and weekends?' },
    { role: 'ai', text: 'Great question! Weekends show 40% higher happiness at outdoor spots, while weekday cafe visits have more "energized" tags. Seems like you use cafes for weekday productivity and nature for weekend restoration.' },
    { role: 'user', text: 'Should I try to get outside more during the week?' },
    { role: 'ai', text: 'Based on your data, even 30-minute midday walks (like you did 3 times last month) showed +15% mood improvement. Your notes from those days mentioned "needed this break" and "felt reset." Short weekday nature breaks seem valuable for you.' },
  ],
  'Conversation 4: Group Planning': [
    { role: 'user', text: 'I want to plan coffee with Sarah this weekend. Any suggestions?' },
    { role: 'ai', text: 'Based on both your preferences, I recommend Sightglass Coffee in SoMa. You both favor that neighborhood (Sarah has 8 check-ins there), it has outdoor seating (which you both prefer), and great single-origin options.' },
    { role: 'user', text: 'What time works best?' },
    { role: 'ai', text: 'Your weekend morning sweet spot is 10-11 AM, and Sarah\'s check-in patterns show she prefers 10:30 AM for coffee meetups. I would suggest 10:30 AM Saturday — gives you both time to sleep in but catches the morning energy you both enjoy.' },
    { role: 'user', text: 'Perfect! Anything else nearby we might enjoy after?' },
    { role: 'ai', text: 'After coffee, you could walk to the nearby Ferry Building (5 min walk). Sarah has visited 4 times and you 6 times. Your notes mention "great for browsing" and hers mention "farmers market on Saturdays." It aligns with both your interests!' },
  ],
}

const conversationQuestions = [
  { key: 'Conversation 1: Finding Relaxation', question: 'Where do I feel most relaxed?', description: 'Discover patterns in your favorite places' },
  { key: 'Conversation 2: Morning Routines', question: 'What are my favorite morning spots?', description: 'Learn about your daily habits' },
  { key: 'Conversation 3: Happiness Patterns', question: 'When am I happiest?', description: 'Understand what brings you joy' },
  { key: 'Conversation 4: Group Planning', question: 'Help me plan coffee with Sarah', description: 'Get personalized recommendations' },
]

function getPlanningConversation(selectedFriends: Friend[]): ConversationMessage[] {
  if (selectedFriends.length === 0) return []
  
  const names = selectedFriends.map(f => f.name).join(' and ')
  const friend = selectedFriends[0]
  
  if (selectedFriends.length === 1) {
    if (friend.name === 'Sarah') {
      return [
        { role: 'user', text: 'I am planning to grab coffee with Sarah this weekend. What would you suggest?' },
        { role: 'ai', text: 'Based on both your preferences, I would recommend Sightglass Coffee in SoMa. You both love coffee shops with art vibes - Sarah has been there 8 times, you 5 times. They have great outdoor seating.' },
        { role: 'user', text: 'That sounds perfect! What time works best?' },
        { role: 'ai', text: 'Your weekend morning sweet spot is 10-11 AM, and Sarah prefers around 10:30 AM for coffee meetups. I would suggest Saturday at 10:30 AM - gives you both time to sleep in but catches that morning energy you both enjoy.' },
        { role: 'user', text: 'Great! Anything else nearby we could do after?' },
        { role: 'ai', text: 'You could walk to SFMOMA afterwards (15 min walk). Sarah has tagged 3 art museums this month, and you both prefer afternoon cultural activities. It is a perfect coffee + art combo!' },
      ]
    } else if (friend.name === 'Alex') {
      return [
        { role: 'user', text: 'I am planning a hiking trip with Alex next weekend. Any trail recommendations?' },
        { role: 'ai', text: 'Perfect match! I recommend Lands End Trail. Alex loves photography and hiking, and you enjoy waterfront nature. The trail offers stunning photo opportunities and beautiful coastal views.' },
        { role: 'user', text: 'When should we go?' },
        { role: 'ai', text: 'Sunday morning around 9 AM would be ideal. Alex activity patterns show early starts for outdoor adventures, and you are most energized for nature walks on weekend mornings. The light will be perfect for photos too.' },
        { role: 'user', text: 'What about afterwards?' },
        { role: 'ai', text: 'You could grab brunch at Cliff House nearby - both of you have positive tags for post-hike meals with a view. Or if you want evening plans, The Chapel has live music Friday at 8 PM. Alex loves intimate music venues.' },
      ]
    } else if (friend.name === 'Maya') {
      return [
        { role: 'user', text: 'I am planning brunch with Maya on Sunday. Where should we go?' },
        { role: 'ai', text: 'Zazie would be perfect! It is Maya number 1 activity - she loves brunch spots. You enjoy weekend morning meals too. French bistro vibes, outdoor seating, and both of you appreciate the cozy atmosphere there.' },
        { role: 'user', text: 'What time should I suggest?' },
        { role: 'ai', text: 'Sunday at 11 AM works best. It is after your usual weekend wake-up time, and Maya brunch visits average around 11-12. The place gets busy, so arriving at 11 gives you a good spot without rushing.' },
        { role: 'user', text: 'Any ideas for after brunch?' },
        { role: 'ai', text: 'Baker Beach is perfect for a chill afternoon. You love Ocean Beach for peaceful moments, and Maya has 6 beach check-ins this month. It is less crowded and great for sunset yoga or just relaxing by the water.' },
      ]
    } else if (friend.name === 'Jordan') {
      return [
        { role: 'user', text: 'I am planning dinner with Jordan on Friday. What restaurant would you recommend?' },
        { role: 'ai', text: 'State Bird Provisions would be perfect! Jordan is a foodie with fine dining preferences, and you both enjoy innovative cuisine. The small plates format is great for sharing and trying multiple dishes together.' },
        { role: 'user', text: 'What time should we make a reservation?' },
        { role: 'ai', text: '7 PM would be ideal. Jordan patterns show Friday night dining preferences, and you typically enjoy going out to dinner at the start of weekends. The restaurant hits peak atmosphere around that time.' },
        { role: 'user', text: 'Should we do anything before dinner?' },
        { role: 'ai', text: 'You could visit de Young Museum in the afternoon around 1 PM. Jordan has a pattern of museum + wine/dining afternoons. It is in Golden Gate Park, which you both enjoy, and makes for a full cultural day together.' },
      ]
    } else {
      return [
        { role: 'user', text: 'I am planning to catch up with Chris over coffee tomorrow. Where should we meet?' },
        { role: 'ai', text: 'Philz Coffee would be great for you two! Chris loves coffee and tech talks, and you both prefer morning productivity sessions. Great wifi and quiet corners for deep conversations about work and life.' },
        { role: 'user', text: 'What time works best?' },
        { role: 'ai', text: 'Saturday at 10 AM would be perfect. Chris logs early morning activities even on weekends, and you are typically up and productive by then. Gives you a couple hours for good conversation before other weekend plans.' },
        { role: 'user', text: 'We also wanted to do something active together. Ideas?' },
        { role: 'ai', text: 'Mission Peak hike on Sunday at 7 AM! Both of you enjoy challenging hikes and Chris logs early morning workouts. Sunrise views from the top are incredible, and you can grab coffee and debrief afterwards.' },
      ]
    }
  }
  
  if (selectedFriends.length === 2) {
    const interests = selectedFriends.flatMap(f => f.interests)
    const hasCoffee = interests.some(i => i.toLowerCase().includes('coffee'))
    const hasOutdoor = interests.some(i => ['Hiking', 'Beaches', 'Yoga'].includes(i))
    
    if (hasCoffee) {
      return [
        { role: 'user', text: `I am planning a coffee meetup with ${names} this weekend. Where should we go?` },
        { role: 'ai', text: `Great group! Looking at all your preferences, I would suggest Ritual Coffee at 10 AM, then walking to SFMOMA around 11:30 AM. This hits coffee, culture, and gives everyone time to catch up.` },
        { role: 'user', text: `That sounds good! Will everyone enjoy it?` },
        { role: 'ai', text: `Yes! ${selectedFriends[0].name} loves ${selectedFriends[0].interests[0].toLowerCase()}, ${selectedFriends[1].name} enjoys ${selectedFriends[1].interests[0].toLowerCase()}, and you appreciate both. The pace works for everyone - not rushed, lots of time to chat.` },
        { role: 'user', text: `Where should we grab lunch after?` },
        { role: 'ai', text: `The Ferry Building is perfect - just 10 minutes away. It has diverse food options so everyone can pick what they want, plus waterfront views. All of you have positive tags for that area and outdoor dining.` },
      ]
    } else if (hasOutdoor) {
      return [
        { role: 'user', text: `I am planning a day trip to a national park with ${names}. Any suggestions?` },
        { role: 'ai', text: `Point Reyes National Seashore would be perfect! It is an hour drive and combines hiking, beaches, and scenic views. ${selectedFriends[0].name} and ${selectedFriends[1].name} both have outdoor activity patterns that align with your preferences.` },
        { role: 'user', text: `What should our itinerary look like?` },
        { role: 'ai', text: `Start early at 8 AM. Hit Alamere Falls trail first (moderate 8-mile hike with waterfall + beach). Pack lunch for the beach, then visit Point Reyes Lighthouse in the afternoon. Everyone energy patterns suggest you can handle a full day outdoors.` },
        { role: 'user', text: `Where should we eat after?` },
        { role: 'ai', text: `Stop at Tomales Bay Oyster Company on the way back. It is casual, has amazing fresh oysters, and all three of you have "seafood" and "outdoor dining" as positive tags. Perfect end to an adventure day.` },
      ]
    } else {
      return [
        { role: 'user', text: `I am planning to hang out with ${names} this weekend. Any suggestions?` },
        { role: 'ai', text: `Great duo! Looking at your combined preferences, I would suggest starting with lunch at Ferry Building (noon), then a walk along the Embarcadero. Both of you enjoy waterfront areas and have positive tags for casual outdoor dining.` },
        { role: 'user', text: `That sounds good! What else could we do?` },
        { role: 'ai', text: `You could check out the Exploratorium afterwards - it is right there and both ${selectedFriends[0].name} and ${selectedFriends[1].name} have "learning" and "interactive experiences" in their activity patterns. Perfect mix of food, walking, and discovery.` },
        { role: 'user', text: `Great idea! What time should we plan for?` },
        { role: 'ai', text: `I would suggest meeting at noon for lunch, 1:30 PM start the walk, and 3 PM at Exploratorium. This matches both your energy patterns and avoids crowds. You will have time to catch up over food, enjoy the views, and then dive into something fun together.` },
      ]
    }
  }
  
  return [
    { role: 'user', text: `I am planning a hangout with ${names} this weekend. Any suggestions for ${selectedFriends.length + 1} people?` },
    { role: 'ai', text: `For ${selectedFriends.length + 1} people, I recommend Dolores Park for a picnic Saturday at 3 PM. It is central, casual, and works for everyone schedules. You can hit up Bi-Rite on the way for supplies!` },
    { role: 'user', text: `Why does this work for everyone?` },
    { role: 'ai', text: `It combines everyone interests: outdoor space, food flexibility, and social vibes. ${selectedFriends.map(f => f.name).join(', ')}, and you all have patterns of enjoying afternoon outdoor activities. Plus, it is low-pressure - people can come and go.` },
    { role: 'user', text: `What if the weather is bad?` },
    { role: 'ai', text: `Backup plan: Ferry Building food tour at 11 AM. Indoor/outdoor mix, diverse food options, everyone can split up and regroup. All ${selectedFriends.length + 1} of you have positive waterfront tags, and it accommodates different dietary preferences.` },
  ]
}

export function Demo() {
  const [activeView, setActiveView] = useState<'timeline' | 'chat' | 'plan'>('timeline')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [chatMessages, setChatMessages] = useState<ConversationMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isPlayingConversation, setIsPlayingConversation] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([])
  const [planMessages, setPlanMessages] = useState<ConversationMessage[]>([])
  const [isPlanTyping, setIsPlanTyping] = useState(false)
  const [isPlayingPlan, setIsPlayingPlan] = useState(false)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)
  const planContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  React.useEffect(() => {
    if (planContainerRef.current) {
      planContainerRef.current.scrollTop = planContainerRef.current.scrollHeight
    }
  }, [planMessages, isPlanTyping])

  const playConversation = (conversationKey: string) => {
    const conversation = conversations[conversationKey]
    if (!conversation) return

    setChatMessages([])
    setIsPlayingConversation(true)
    
    let delay = 0
    conversation.forEach((message, index) => {
      setTimeout(() => {
        if (message.role === 'user') {
          setChatMessages(prev => [...prev, message])
          if (index < conversation.length - 1) {
            setTimeout(() => setIsTyping(true), 500)
          }
        } else {
          setIsTyping(false)
          setChatMessages(prev => [...prev, message])
        }
        
        if (index === conversation.length - 1) {
          setIsPlayingConversation(false)
        }
      }, delay)
      
      delay += message.role === 'user' ? 800 : 2000
    })
  }

  const toggleFriendSelection = (friend: Friend) => {
    setSelectedFriends(prev => {
      const isSelected = prev.find(f => f.id === friend.id)
      if (isSelected) {
        return prev.filter(f => f.id !== friend.id)
      } else {
        return [...prev, friend]
      }
    })
    setPlanMessages([])
  }

  const handleStartPlanConversation = () => {
    const conversation = getPlanningConversation(selectedFriends)
    if (!conversation || conversation.length === 0) return

    setPlanMessages([])
    setIsPlayingPlan(true)
    
    let delay = 0
    conversation.forEach((message, index) => {
      setTimeout(() => {
        if (message.role === 'user') {
          setPlanMessages(prev => [...prev, message])
          if (index < conversation.length - 1) {
            setTimeout(() => setIsPlanTyping(true), 500)
          }
        } else {
          setIsPlanTyping(false)
          setPlanMessages(prev => [...prev, message])
        }
        
        if (index === conversation.length - 1) {
          setIsPlayingPlan(false)
        }
      }, delay)
      
      delay += message.role === 'user' ? 800 : 2000
    })
  }

  return (
    <Section id="demo" aria-labelledby="demo-heading" className="bg-bg/50 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 opacity-60">
        <MorphingBlob color="cy" size="lg" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 opacity-50">
        <MorphingBlob color="vi" size="md" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-12"
      >
        <h2 id="demo-heading" className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-cy via-vi to-am bg-clip-text text-transparent">
            Try It Out
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-fg/70 sm:text-xl">
          Experience how your AI twin understands your life patterns
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mx-auto max-w-md"
      >
        {/* Phone Mockup */}
        <div className="relative mx-auto w-full max-w-[380px]">
          {/* Phone Frame */}
          <div className="relative rounded-[3rem] border-[14px] border-fg/20 bg-fg/20 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 z-10 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-fg/20"></div>
            
            {/* Screen */}
            <div className="relative overflow-hidden rounded-[2.3rem] bg-bg">
              {/* Status Bar */}
              <div className="flex items-center justify-between bg-bg px-6 pb-2 pt-8 text-xs text-fg/60">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <svg className="h-3 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </div>
              </div>

              {/* View Toggle - Inside Phone */}
              <div className="bg-bg px-4 pb-3 flex gap-2">
                <button
                  onClick={() => setActiveView('timeline')}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all",
                    activeView === 'timeline'
                      ? "bg-gradient-to-r from-cy to-vi text-bg shadow-md"
                      : "bg-fg/10 text-fg/70"
                  )}
                >
                  📍 Timeline
                </button>
                <button
                  onClick={() => setActiveView('chat')}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all",
                    activeView === 'chat'
                      ? "bg-gradient-to-r from-cy to-vi text-bg shadow-md"
                      : "bg-fg/10 text-fg/70"
                  )}
                >
                  💬 Ask AI
                </button>
                <button
                  onClick={() => setActiveView('plan')}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all",
                    activeView === 'plan'
                      ? "bg-gradient-to-r from-cy to-vi text-bg shadow-md"
                      : "bg-fg/10 text-fg/70"
                  )}
                >
                  🤝 Plan
                </button>
              </div>

              {/* App Content */}
              <div className="h-[600px] overflow-y-auto bg-bg px-4 pb-6">
        <AnimatePresence mode="wait">
          {activeView === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-3"
            >
              <div className="mb-4 text-center">
                <h3 className="mb-1 text-lg font-semibold text-fg">Your Recent Places</h3>
                <p className="text-xs text-fg/60">
                  A glimpse into places you have visited
                </p>
              </div>
              <div className="space-y-3">
                {samplePlaces.map((place, index) => (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedPlace(selectedPlace?.id === place.id ? null : place)}
                    className={cn(
                      "cursor-pointer rounded-xl border p-4 transition-all",
                      selectedPlace?.id === place.id
                        ? "border-cy/50 bg-gradient-to-r from-cy/10 to-vi/10 shadow-lg"
                        : "border-fg/10 bg-fg/5 hover:border-fg/20 hover:bg-fg/10"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-lg">{place.category === 'Cafe' ? '☕' : place.category === 'Nature' ? '🌳' : place.category === 'Food' ? '🍞' : place.category === 'Outdoors' ? '🌊' : place.category === 'Culture' ? '🎨' : '🎵'}</span>
                          <h4 className="font-semibold text-fg">{place.name}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-fg/60">
                          <span className="flex items-center gap-1">
                            <span className="text-xs">🕒</span> {place.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-xs">📍</span> {place.category}
                          </span>
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            place.mood === 'Energized' ? "bg-amber-500/20 text-amber-600" :
                            place.mood === 'Relaxed' ? "bg-green-500/20 text-green-600" :
                            place.mood === 'Happy' ? "bg-pink-500/20 text-pink-600" :
                            place.mood === 'Peaceful' ? "bg-blue-500/20 text-blue-600" :
                            "bg-purple-500/20 text-purple-600"
                          )}>
                            {place.mood}
                          </span>
                        </div>
                      </div>
                      <div className={cn(
                        "ml-4 text-xl transition-transform",
                        selectedPlace?.id === place.id ? "rotate-90" : ""
                      )}>
                        →
                      </div>
                    </div>
                    {selectedPlace?.id === place.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 rounded-lg border-t border-fg/10 pt-4 text-sm text-fg/70"
                      >
                        <p className="mb-2 font-medium text-fg">AI Insights:</p>
                        <p>
                          {place.category === 'Cafe' ? 'You visit cafes most frequently in the morning. Your productivity peaks during these visits.' :
                           place.category === 'Nature' ? 'Nature visits boost your mood by 18%. You prefer late afternoon walks in parks.' :
                           place.category === 'Food' ? 'You enjoy bakeries on weekends. Often visited after morning exercise.' :
                           place.category === 'Outdoors' ? 'Beach visits bring you peace. Your stress levels drop 25% during sunset visits.' :
                           place.category === 'Culture' ? 'Museum visits inspire creativity. You tend to visit on weekday afternoons.' :
                           'Live music energizes you. You prefer intimate venues with acoustic performances.'}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex h-[550px] flex-col"
            >
              <div className="mb-3 flex items-center gap-2 border-b border-fg/10 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cy via-vi to-am">
                  <div className="h-2.5 w-2.5 rounded-full bg-bg animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-fg">Your AI Twin</h3>
                  <p className="text-[10px] text-fg/60">Ask me about your patterns</p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 border border-green-500/20">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-medium text-green-600">Active</span>
                </div>
              </div>

              {chatMessages.length === 0 && (
                <div className="mb-3">
                  <p className="mb-2 text-xs text-fg/60">Try asking me:</p>
                  <div className="grid gap-2">
                    {conversationQuestions.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => playConversation(item.key)}
                        disabled={isPlayingConversation}
                        className={cn(
                          "group rounded-lg border p-3 text-left transition-all",
                          isPlayingConversation
                            ? "border-fg/10 bg-fg/5 text-fg/30 cursor-not-allowed"
                            : "border-cy/30 bg-gradient-to-br from-cy/5 to-vi/5 hover:border-cy/50 hover:from-cy/10 hover:to-vi/10"
                        )}
                      >
                        <div className="mb-1 flex items-start gap-1.5">
                          <span className="mt-0.5 text-cy text-sm">💭</span>
                          <p className="text-xs font-medium text-fg leading-snug">
                            {item.question}
                          </p>
                        </div>
                        <p className="text-[10px] text-fg/50 pl-5">
                          {item.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 scroll-smooth">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex gap-2",
                      message.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === 'ai' && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cy to-vi">
                        <div className="h-1.5 w-1.5 rounded-full bg-bg"></div>
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3 py-2 text-xs",
                        message.role === 'user'
                          ? "bg-gradient-to-r from-cy to-vi text-bg"
                          : "bg-fg/10 text-fg"
                      )}
                    >
                      {message.text}
                    </div>
                    {message.role === 'user' && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fg to-fg/80 text-[9px] font-bold text-bg">
                        YOU
                      </div>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cy to-vi">
                      <div className="h-1.5 w-1.5 rounded-full bg-bg"></div>
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-fg/10 px-3 py-2">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/40 [animation-delay:-0.3s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/40 [animation-delay:-0.15s]"></div>
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/40"></div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-3 rounded-lg border border-fg/10 bg-fg/5 px-3 py-2 text-center">
                <p className="text-[10px] text-fg/60">
                  {isPlayingConversation
                    ? "💬 Conversation in progress..."
                    : chatMessages.length > 0
                    ? "✨ Demo showing AI understanding"
                    : "Select a question above to start"}
                </p>
              </div>
            </motion.div>
          )}

          {activeView === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col h-[550px]"
            >
              {selectedFriends.length === 0 && (
                <div className="mb-4">
                  <h3 className="mb-1 text-lg font-semibold text-fg">Plan with Friends</h3>
                  <p className="text-xs text-fg/60">
                    Select friends to start planning
                  </p>
                </div>
              )}

              {planMessages.length === 0 && (
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-medium text-fg/80">Your Friends</p>
                    {selectedFriends.length > 0 && (
                      <button
                        onClick={() => {
                          setSelectedFriends([])
                          setPlanMessages([])
                        }}
                        className="text-[10px] text-fg/60 hover:text-fg"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="grid gap-2 grid-cols-2">
                    {friends.map((friend) => {
                      const isSelected = selectedFriends.find(f => f.id === friend.id)
                      return (
                        <motion.button
                          key={friend.id}
                          onClick={() => toggleFriendSelection(friend)}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "rounded-lg border p-2.5 text-left transition-all",
                            isSelected
                              ? "border-cy/50 bg-gradient-to-br from-cy/10 to-vi/10 shadow-md"
                              : "border-fg/10 bg-fg/5 hover:border-fg/20"
                          )}
                        >
                          <div className="mb-1.5 flex items-center justify-between">
                            <div
                              className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold shadow-sm bg-gradient-to-br',
                                friend.color,
                                isSelected ? "border-cy text-white" : "border-bg text-white"
                              )}
                            >
                              {friend.avatar}
                            </div>
                            <div
                              className={cn(
                                "h-4 w-4 rounded-full border-2 transition-all flex items-center justify-center",
                                isSelected
                                  ? "border-cy bg-cy"
                                  : "border-fg/30 bg-transparent"
                              )}
                            >
                              {isSelected && (
                                <svg className="h-3 w-3 text-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <p className="mb-0.5 text-xs font-semibold text-fg">{friend.name}</p>
                          <p className="text-[9px] text-fg/60 leading-tight">{friend.interests.slice(0, 2).join(', ')}</p>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              )}

              {selectedFriends.length > 0 && planMessages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="mb-3 rounded-lg border border-cy/30 bg-gradient-to-r from-cy/10 to-vi/10 p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {selectedFriends.map((friend) => (
                          <div
                            key={friend.id}
                            className={cn(
                              'flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg text-[10px] font-bold text-bg shadow-md bg-gradient-to-br',
                              friend.color
                            )}
                          >
                            {friend.avatar}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs font-medium text-fg">
                        {selectedFriends.map(f => f.name).join(', ')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleStartPlanConversation}
                    disabled={isPlayingPlan}
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-xs font-semibold shadow-md transition-all",
                      isPlayingPlan
                        ? "bg-fg/10 text-fg/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-cy to-vi text-bg"
                    )}
                  >
                    Ask AI for Suggestions
                  </button>
                </motion.div>
              )}

              {planMessages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-1 flex-col"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-fg/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cy via-vi to-am flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-bg animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-fg">Planning</h3>
                        <div className="flex items-center gap-1.5">
                          <div className="flex -space-x-1">
                            {selectedFriends.map((friend) => (
                              <div
                                key={friend.id}
                                className={cn(
                                  'flex h-4 w-4 items-center justify-center rounded-full border border-bg text-[8px] font-bold text-bg bg-gradient-to-br',
                                  friend.color
                                )}
                              >
                                {friend.avatar}
                              </div>
                            ))}
                          </div>
                          <p className="text-[10px] text-fg/60">
                            {selectedFriends.map(f => f.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                    {!isPlayingPlan && (
                      <button
                        onClick={() => {
                          setPlanMessages([])
                          setSelectedFriends([])
                        }}
                        className="rounded-md border border-fg/20 bg-fg/5 px-2 py-1 text-[10px] font-medium text-fg/70"
                      >
                        ← Back
                      </button>
                    )}
                  </div>

                  <div ref={planContainerRef} className="flex-1 overflow-y-auto space-y-3 scroll-smooth">
                    {planMessages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex gap-2",
                          message.role === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.role === 'ai' && (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cy to-vi">
                            <div className="h-1.5 w-1.5 rounded-full bg-bg"></div>
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[75%] rounded-2xl px-3 py-2 text-xs",
                            message.role === 'user'
                              ? "bg-gradient-to-r from-cy to-vi text-bg"
                              : "bg-fg/10 text-fg"
                          )}
                        >
                          {message.text}
                        </div>
                        {message.role === 'user' && (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fg to-fg/80 text-[9px] font-bold text-bg">
                            YOU
                          </div>
                        )}
                      </motion.div>
                    ))}
                    {isPlanTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cy to-vi">
                          <div className="h-1.5 w-1.5 rounded-full bg-bg"></div>
                        </div>
                        <div className="flex items-center gap-1 rounded-2xl bg-fg/10 px-3 py-2">
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/40 [animation-delay:-0.3s]"></div>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/40 [animation-delay:-0.15s]"></div>
                          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg/40"></div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-3 rounded-lg border border-fg/10 bg-fg/5 px-3 py-2 text-center">
                    <p className="text-[10px] text-fg/60">
                      {isPlayingPlan
                        ? "💬 Thinking..."
                        : "✨ Demo using combined preferences"}
                    </p>
                  </div>
                </motion.div>
              )}

              {selectedFriends.length === 0 && planMessages.length === 0 && (
                <div className="flex flex-1 items-center justify-center text-center">
                  <div>
                    <div className="mb-3 text-5xl">👥</div>
                    <p className="text-xs text-fg/60 mb-1">Select friends to start planning</p>
                    <p className="text-[10px] text-fg/50">AI suggests places for everyone</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-fg/20"></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 text-center text-sm text-fg/60"
      >
        This is a demo with sample data. The full app will learn from your real experiences.
      </motion.div>
    </Section>
  )
}
