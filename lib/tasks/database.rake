namespace :db do
  desc "Prepare database based on environment"
  task prepare: :environment do
    if Rails.env.production?
      Rake::Task["db:create"].invoke if ActiveRecord::Base.connection.table_exists?("schema_migrations")
      Rake::Task["db:migrate"].invoke
    else
      Rake::Task["db:setup"].invoke
    end
  end
end 