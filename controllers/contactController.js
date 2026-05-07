const Contact = require('../models/Contact')

exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact({
          ...req.body,
            user: req.user._id
        })

        const saved =await newContact.save()
        res.status(201).json(saved)
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

//GET route(search & Pagination):
exports.getContacts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const search = req.query.search || ""

        const query = {
            user: req.user._id,
            name: { $regex: search, $options: 'i' }
        }

        const contacts = await Contact.find(query)
            .skip((page - 1) * limit)
            .limit(limit)

        const total = await Contact.countDocuments(query)

        res.json({
            contacts,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    // owner check
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: 'Not authorized'
      })
    }

    res.json(contact)
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}
// UPDATE route:
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
         message: 'Not found' 
        })
    }

    // check owner:
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        message: 'Not authorized' 
      })
    }

    const updated = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.json(updated)
  } 
  catch (err) {
    res.status(500).json({ 
      error: err.message
     })
  }
}

// DELETE route:
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({ 
        message: 'Not found' 
      })
    }

    // check owner:
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        message: 'Not authorized' 
      })
    }

    await contact.deleteOne()

    res.json({
      message: 'Deleted successfully'
    })
  } 
  catch (err) {
    res.status(500).json({ 
      error: err.message 
    })
  }
}

