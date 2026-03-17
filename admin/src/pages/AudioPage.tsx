import { useState, useEffect } from 'react'
import { Music, Upload, Trash2, ToggleLeft, ToggleRight, Loader2, Search } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface AudioTrack {
  id: string
  title: string
  url: string
  category: string
  is_active: boolean
  created_at: string
}

export default function AudioPage() {
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    fetchTracks()
  }, [])

  const fetchTracks = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('audio_tracks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tracks:', error)
    } else {
      setTracks(data || [])
    }
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `public/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('audio-tracks')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('audio-tracks')
        .getPublicUrl(filePath)

      const { error: dbError } = await supabase
        .from('audio_tracks')
        .insert([{
          title: file.name,
          url: publicUrl,
          category: 'meditation',
          is_active: true
        }])

      if (dbError) throw dbError
      
      fetchTracks()
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Помилка завантаження')
    } finally {
      setUploading(false)
    }
  }

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('audio_tracks')
      .update({ is_active: !currentStatus })
      .eq('id', id)

    if (!error) {
      setTracks(tracks.map(t => t.id === id ? { ...t, is_active: !currentStatus } : t))
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Видалити цей трек?')) {
      const { error } = await supabase
        .from('audio_tracks')
        .delete()
        .eq('id', id)

      if (!error) {
        setTracks(tracks.filter(t => t.id !== id))
      }
    }
  }

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || track.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-df2b-text">
        <div>
          <h2 className="text-3xl font-bold">Аудіо треки</h2>
          <p className="text-df2b-text-secondary mt-1">Керування фоновим аудіо та медіатекою</p>
        </div>
        <div className="relative">
          <input
            type="file"
            id="audio-upload"
            className="hidden"
            accept="audio/*"
            onChange={handleUpload}
            disabled={uploading}
          />
          <label
            htmlFor="audio-upload"
            className="flex items-center gap-2 bg-df2b-accent text-df2b-bg px-4 py-2 rounded-lg font-medium hover:bg-df2b-accent/90 transition-all cursor-pointer"
          >
            {uploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
            Завантажити аудіо
          </label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-df2b-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Пошук треку..."
            className="w-full bg-df2b-bg-secondary border border-df2b-accent/10 rounded-lg pl-10 pr-4 py-2 text-df2b-text focus:outline-none focus:border-df2b-accent/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="bg-df2b-bg-secondary border border-df2b-accent/10 rounded-lg px-4 py-2 text-df2b-text focus:outline-none focus:border-df2b-accent/30"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">Всі категорії</option>
          <option value="meditation">Медіація</option>
          <option value="sleep">Сон</option>
          <option value="focus">Фокус</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-df2b-accent animate-spin" />
          </div>
        ) : filteredTracks.map((track) => (
          <div key={track.id} className="bg-df2b-bg-secondary border border-df2b-accent/10 rounded-xl p-6 hover:border-df2b-accent/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-df2b-accent/10 rounded-lg text-df2b-accent">
                <Music size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button 
                  onClick={() => handleDelete(track.id)}
                  className="p-2 text-df2b-text-secondary hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <h3 className="font-bold text-lg text-df2b-text mb-1 truncate">{track.title}</h3>
            <p className="text-sm text-df2b-text-secondary mb-4 uppercase tracking-wider">{track.category}</p>
            
            <div className="flex justify-between items-center pt-4 border-t border-df2b-accent/10">
              <span className="text-xs text-df2b-text-secondary">
                {new Date(track.created_at).toLocaleDateString()}
              </span>
              <button
                onClick={() => toggleStatus(track.id, track.is_active)}
                className="flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: track.is_active ? '#D4A574' : '#64748B' }}
              >
                {track.is_active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                {track.is_active ? 'Активний' : 'Неактивний'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
